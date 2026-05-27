const { EmbedBuilder } = require('discord.js');
const Parser = require('rss-parser');
const parser = new Parser();

const CHAINES = [
  {
    nom: 'Galax',
    rss: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCDlg0T0r9v2_XRCG8yqB2vQ',
    emoji: '🌌',
  },
  {
    nom: 'The Guill84',
    rss: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCk5fFxZePtpX1QLM7edDsNA',
    emoji: '🎮',
  },
{
    nom: 'TheGuill84 Replay',
    rss: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCprVmVaIMhSi5PFMgjJ6z2Q',
    emoji: '🎬',
  },
  {
    nom: 'MrTiboute',
    rss: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCvESfgvWjujuUV17XUi2evg',
    emoji: '🎯',
  },
];

const NOM_SALON = 'vidéos-youtube';
const dernieresVideos = new Map();

async function verifierYoutube(client) {
  for (const guild of client.guilds.cache.values()) {
    const salon = guild.channels.cache.find(
      c => c.name === NOM_SALON || c.name === 'videos-youtube' || c.name === 'youtube'
    );
    if (!salon) continue;

    for (const chaine of CHAINES) {
      try {
        const feed = await parser.parseURL(chaine.rss);
        const derniereVideo = feed.items[0];
        if (!derniereVideo) continue;

        const cle = `${guild.id}-${chaine.nom}`;
        const dernierLien = dernieresVideos.get(cle);

        if (!dernierLien) {
          dernieresVideos.set(cle, derniereVideo.link);
          console.log(`📺 ${chaine.nom} : vidéo initiale enregistrée`);
          continue;
        }

        if (derniereVideo.link !== dernierLien) {
          dernieresVideos.set(cle, derniereVideo.link);

          const videoId = derniereVideo.link.split('v=')[1];
          const embed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle(`${chaine.emoji} Nouvelle vidéo de ${chaine.nom} !`)
            .setDescription(`**${derniereVideo.title}**`)
            .setURL(derniereVideo.link)
            .setImage(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
            .addFields({
              name: '📅 Publiée',
              value: `<t:${Math.floor(new Date(derniereVideo.pubDate).getTime() / 1000)}:R>`,
            })
            .setFooter({ text: `📺 ${chaine.nom} sur YouTube` });

          await salon.send({
            content: `🔔 **${chaine.nom}** vient de poster une nouvelle vidéo !`,
            embeds: [embed],
          });
          console.log(`📺 Nouvelle vidéo postée : ${derniereVideo.title}`);
        }
      } catch (err) {
        console.error(`Erreur RSS ${chaine.nom}:`, err.message);
      }
    }
  }
}

module.exports = { verifierYoutube };