const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const NOM_SALON = 'live-twitch';
let accessToken = null;

async function getAccessToken() {
  const res = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
  );
  accessToken = res.data.access_token;
}

async function verifierTwitch(client) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    if (!accessToken) await getAccessToken();

    const { data: streameurs, error } = await supabase
      .from('streameurs')
      .select('*');

    if (error || !streameurs?.length) return;

    const logins = streameurs.map(s => `user_login=${s.login}`).join('&');
    const res = await axios.get(`https://api.twitch.tv/helix/streams?${logins}`, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const streamsEnLive = res.data.data;

    for (const guild of client.guilds.cache.values()) {
      const salon = guild.channels.cache.find(
        c => c.name === NOM_SALON || c.name === 'twitch' || c.name === 'lives'
      );
      if (!salon) continue;

      for (const streameur of streameurs) {
        const stream = streamsEnLive.find(s => s.user_login.toLowerCase() === streameur.login.toLowerCase());

        if (stream && !streameur.en_live) {
          const thumbnail = stream.thumbnail_url
            .replace('{width}', '1280')
            .replace('{height}', '720');

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
          try {
            if (streameur.salon_id && streameur.message_id) {
              const salonMsg = await client.channels.fetch(streameur.salon_id);
              const message = await salonMsg.messages.fetch(streameur.message_id);
              await message.delete();
              console.log(`⚫ Message de ${streameur.nom} supprimé.`);
            }
          } catch {}

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