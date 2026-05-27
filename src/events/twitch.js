const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

const STREAMEURS = [
  { nom: 'MrTiboute', login: 'mrtiboute', emoji: '🎯' },
  { nom: 'TheGuill84', login: 'theguill84', emoji: '🎮' },
  { nom: 'Pandaahhhhh', login: 'pandaahhhhh', emoji: '🐼' },
];

const NOM_SALON = 'live-twitch';
const enLive = new Map();
let accessToken = null;

async function getAccessToken() {
  const res = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
  );
  accessToken = res.data.access_token;
}

async function verifierTwitch(client, forcePost = false) {
  try {
    if (!accessToken) await getAccessToken();

    const logins = STREAMEURS.map(s => `user_login=${s.login}`).join('&');
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

      for (const streameur of STREAMEURS) {
        const stream = streamsEnLive.find(s => s.user_login.toLowerCase() === streameur.login.toLowerCase());
        const etaitEnLive = enLive.get(streameur.login);

        if (stream && (!etaitEnLive || forcePost)) {
          enLive.set(streameur.login, true);

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

          await salon.send({
            content: `🔴 Hey ! **${streameur.nom}** est en live maintenant ! Go matter ! ${streameur.emoji}`,
            embeds: [embed],
          });
          console.log(`🔴 ${streameur.nom} est en live !`);

        } else if (!stream) {
          enLive.set(streameur.login, false);
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