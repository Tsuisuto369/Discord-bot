const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`\n🌟 369 Bot est en ligne ! Connecté en tant que ${client.user.tag}`);
    console.log(`📊 Présent sur ${client.guilds.cache.size} serveur(s)\n`);
    client.user.setActivity('/aide pour mes commandes', { type: ActivityType.Playing });
  },
};