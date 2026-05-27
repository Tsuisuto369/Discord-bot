const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const STREAMEURS = [
  { nom: 'MrTiboute', login: 'mrtiboute', emoji: '👻' },
  { nom: 'TheGuill84', login: 'theguill84', emoji: '🟩' },
  { nom: 'Pandaahhhhh', login: 'pandaahhhhh', emoji: '🐼' },
  { nom: 'FantaBobShow', login: 'fantabobshow', emoji: '🎭' },
];

const NOM_SALON = 'live-twitch';
const FICHIER_LIVES = path.join(__dirname, '../../lives.json');
let accessToken = null;

function chargerLives() {
  try {
    if (fs.existsSync(FICHIER_LIVES)) {
      return JSON.parse(fs.readFileSync(FICHIER_LIVES, 'utf8'));
    }
  } catch {}
  return {};
}

function sauvegarderLives(data) {
  try {
    fs.writeFileSync(FICHIER_LIVES, JSON.stringify(data, null, 2));
  } catch {}
}

async function getAccessToken() {
  const res = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
  );
  accessToken = res.data.access_token;
}

async function verifierTwitch(client) {
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
    const livesActuels = chargerLives();

    for (const guild of client.guilds.cache.values()) {
      const salon = guild.channels.cache.find(
        c => c.name === NOM_SALON || c.name === 'twitch' || c.name === 'lives'
      );
      if (!salon) continue;

      for (const streameur of STREAMEURS) {
        const stream = streamsEnLive.find(s => s.user_login.toLowerCase() === streameur.login.toLowerCase());
        const etaitEnLive = livesActuels[streameur.login] === true;

        if (stream && !etaitEnLive) {
          livesActuels[streameur.login] = true;
          sauvegarderLives(livesActuels);

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
            content: `🔴 Hey ! **${streameur.nom}** est en live maintenant ! ${streameur.emoji}`,
            embeds: [embed],
          });
          console.log(`🔴 ${streameur.nom} est en live !`);

        } else if (!stream && etaitEnLive) {
          livesActuels[streameur.login] = false;
          sauvegarderLives(livesActuels);
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