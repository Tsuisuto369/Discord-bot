const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`\n🌟 369 Bot est en ligne ! Connecté en tant que ${client.user.tag}`);
    console.log(`📊 Présent sur ${client.guilds.cache.size} serveur(s)\n`);

    const activities = [
      { name: '/aide pour mes commandes', type: ActivityType.Playing },
      { name: 'vos messages ✨', type: ActivityType.Watching },
      { name: 'la musique des serveurs', type: ActivityType.Listening },
    ];

    let i = 0;
    const setActivity = () => {
      client.user.setActivity(activities[i % activities.length]);
      i++;
    };

    setActivity();
    setInterval(setActivity, 15_000);
  },
};
