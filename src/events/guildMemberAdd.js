const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const channel =
      member.guild.systemChannel ||
      member.guild.channels.cache.find(c => c.name.includes('général') || c.name.includes('general'));

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(0x7c3aed)
      .setTitle('✨ Nouveau membre !')
      .setDescription(`Bienvenue sur **${member.guild.name}**, ${member}! 🎉\nTu es le **${member.guild.memberCount}ème** membre.`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: 'Tape /aide pour découvrir mes commandes' })
      .setTimestamp();

    channel.send({ embeds: [embed] }).catch(() => {});
  },
};
