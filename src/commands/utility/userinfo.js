const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('👤 Affiche les infos d\'un membre')
    .addUserOption(opt =>
      opt.setName('membre').setDescription('Le membre à inspecter').setRequired(false)
    ),

  async execute(interaction) {
    const target = interaction.options.getMember('membre') || interaction.member;
    const user = target.user;

    const roles = target.roles.cache
      .filter(r => r.id !== interaction.guild.id)
      .sort((a, b) => b.position - a.position)
      .map(r => `<@&${r.id}>`)
      .slice(0, 10)
      .join(' ') || 'Aucun';

    const embed = new EmbedBuilder()
      .setColor(target.displayHexColor || 0x7c3aed)
      .setTitle(`👤 ${user.tag}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }))
      .addFields(
        { name: '🆔 ID', value: user.id, inline: true },
        { name: '📅 Compte créé', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '📥 A rejoint', value: `<t:${Math.floor(target.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: '🤖 Bot', value: user.bot ? 'Oui' : 'Non', inline: true },
        { name: `🎭 Rôles (${target.roles.cache.size - 1})`, value: roles },
      )
      .setFooter({ text: `Demandé par ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
