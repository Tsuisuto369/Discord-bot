const { Events } = require('discord.js');
const { addXP } = require('../utils/xp');

// Anti-spam : cooldown de 60s par utilisateur
const cooldowns = new Map();

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    const key = `${message.guild.id}-${message.author.id}`;
    const now = Date.now();
    const cooldown = 60_000; // 60 secondes

    if (cooldowns.has(key) && now - cooldowns.get(key) < cooldown) return;
    cooldowns.set(key, now);

    const xpGain = Math.floor(Math.random() * 10) + 5; // 5 à 15 XP
    const result = addXP(message.author.id, message.guild.id, xpGain);

    if (result.leveledUp) {
      message.channel.send(
        `🎉 Félicitations ${message.author} ! Tu passes au **niveau ${result.level}** ! ⭐`
      ).catch(() => {});
    }
  },
};
