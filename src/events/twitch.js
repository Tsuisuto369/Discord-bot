const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const supabase = require('../utils/supabase');

const NOMS_SALON_PAR_DEFAUT = ['live-twitch', 'twitch', 'lives'];
let accessToken = null;

async function getAccessToken() {
  const res = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
  );
  accessToken = res.data.access_token;
}

// Récupère le salon d'annonce configuré via /setchannel, sinon retombe
// sur l'ancienne recherche par nom (rétrocompatibilité).
async function resolveSalonAnnonce(client, guild, settings) {
  if (settings?.announce_channel_id) {
    try {
      return await client.channels.fetch(settings.announce_channel_id);
    } catch {
      // salon supprimé/inaccessible : on retombe sur la recherche par nom
    }
  }
  return guild.channels.cache.find(c => NOMS_SALON_PAR_DEFAUT.includes(c.name)) || null;
}

async function verifierTwitch(client) {
  try {
    if (!accessToken) await getAccessToken();

    // Une seule requête Supabase pour les streameurs et une pour les
    // réglages des salons, exécutées en parallèle (au lieu d'une requête
    // par serveur comme avant) — optimisation.
    const [{ data: streameurs, error: errStreameurs }, { data: settingsRows }] = await Promise.all([
      supabase.from('streameurs').select('*'),
      supabase.from('settings').select('*'),
    ]);

    if (errStreameurs || !streameurs?.length) return;

    const settingsByGuild = new Map((settingsRows || []).map(s => [s.guild_id, s]));

    const logins = streameurs.map(s => `user_login=${s.login}`).join('&');
    const loginsUsers = streameurs.map(s => `login=${s.login}`).join('&');

    const [resStreams, resUsers] = await Promise.all([
      axios.get(`https://api.twitch.tv/helix/streams?${logins}`, {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`,
        },
      }),
      axios.get(`https://api.twitch.tv/helix/users?${loginsUsers}`, {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`,
        },
      }),
    ]);

    const streamsEnLive = resStreams.data.data;
    const photosProfil = new Map(resUsers.data.data.map(u => [u.login.toLowerCase(), u.profile_image_url]));

    for (const guild of client.guilds.cache.values()) {
      const settings = settingsByGuild.get(guild.id);
      const salon = await resolveSalonAnnonce(client, guild, settings);
      if (!salon) continue;

      for (const streameur of streameurs) {
        const stream = streamsEnLive.find(s => s.user_login.toLowerCase() === streameur.login.toLowerCase());

        if (stream && !streameur.en_live) {
          const thumbnail = stream.thumbnail_url
            .replace('{width}', '1280')
            .replace('{height}', '720');

          const photoProfil = photosProfil.get(streameur.login.toLowerCase());

          const embed = new EmbedBuilder()
            .setColor(0x9146ff)
            .setTitle(`${streameur.emoji} ${streameur.nom} est en live !`)
            .setDescription(`**${stream.title}**`)
            .setURL(`https://www.twitch.tv/${streameur.login}`)
            .setImage(thumbnail)
            .addFields(
              { name: '🎮 Jeu', value: stream.game_name || 'Inconnu', inline: true },
              { name: '👥 Viewers', value: `${stream.viewer_count}`, inline: true },
            )
            .setFooter({ text: '📺 En direct sur Twitch' })
            .setTimestamp();

          if (photoProfil) embed.setThumbnail(photoProfil);

          const msg = await salon.send({
            content: `🔴 Hey ! **${streameur.nom}** est en live maintenant ! ${streameur.emoji}`,
            embeds: [embed],
          });

          await supabase
            .from('streameurs')
            .update({ en_live: true, message_id: msg.id, salon_id: salon.id })
            .eq('login', streameur.login);

          console.log(`🔴 ${streameur.nom} est en live !`);

        } else if (!stream && streameur.en_live) {
          if (streameur.salon_id && streameur.message_id) {
            try {
              const salonAnnonce = await client.channels.fetch(streameur.salon_id);
              const message = await salonAnnonce.messages.fetch(streameur.message_id);

              // Si un salon "fin de live" est configuré, on y garde une
              // trace de l'annonce avant de la supprimer du salon d'annonce.
              if (settings?.fin_channel_id) {
                try {
                  const salonFin = await client.channels.fetch(settings.fin_channel_id);
                  const ancienEmbed = message.embeds[0];
                  const embedFin = ancienEmbed
                    ? EmbedBuilder.from(ancienEmbed).setColor(0x57534e).setFooter({ text: '📺 Live terminé' }).setTimestamp()
                    : null;

                  await salonFin.send({
                    content: `⚫ **${streameur.nom}** a terminé son live.`,
                    embeds: embedFin ? [embedFin] : [],
                  });
                } catch (err) {
                  console.error(`Erreur envoi salon fin pour ${streameur.nom}:`, err.message);
                }
              }

              await message.delete();
              console.log(`⚫ Message de ${streameur.nom} supprimé.`);
            } catch {
              // message ou salon déjà supprimé : on ignore
            }
          }

          await supabase
            .from('streameurs')
            .update({ en_live: false, message_id: null, salon_id: null })
            .eq('login', streameur.login);

          console.log(`⚫ ${streameur.nom} a terminé son live.`);
        }
      }
    }
  } catch (err) {
    if (err.response?.status === 401) {
      accessToken = null;
      await getAccessToken();
    }
    console.error('Erreur Twitch:', err.message);
  }
}

module.exports = { verifierTwitch };
