const { EmbedBuilder } = require('discord.js');
const Parser = require('rss-parser');
const parser = new Parser();

// ─── Chaînes YouTube à surveiller ────────────────────────────────────────────
const CHAINES = [
  {
    nom: 'Galax',
    rss: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCcHqeJgEjy3EJTyiXANSp6g',
    emoji: '🌌',
  },
  {
    nom: 'The Guill84',
    rss: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCuHB6aHMlMfWYGEGbAiRLhQ',
    emoji: '🎮',
  },
];

// Nom du salon où poster les vidéos
const NOM_SALON = 'vidéos-youtube';

// Stocke les dernières vidéos vues pour éviter les doublons
const dernieresVideos = new Map();

async function verifierYoutube(client) {
  // Cherche le salon dans tous les serveurs
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

        // Première fois qu'on vérifie — on enregistre sans poster
        if (!dernierLien) {
          dernieresVideos.set(cle,