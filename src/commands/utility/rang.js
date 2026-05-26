const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUser, xpForLevel } = require('../../utils/xp');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rang')
    .setDescription('⭐ Affiche votre niveau XP')
    .addUserOption(opt =>
      opt.setName('membre').setDescription('Le membre à consulter').setRequired(false)
    ),

  async execute(interaction) {
    const target = interaction.options.getMember('membre') || interaction.member;
    const userData = getUser(target.user.id, interaction.guild.id);

    const needed = xpForLevel(userData.level);
    const progress = Math.floor((userData.xp / needed) * 20);
    const bar = '█'.repeat(progress) + '░'.repeat(20 - progress);

    const embed = new EmbedBuilder()
      .setColor(0x7c3aed)
      .setTitle(`⭐ Rang de ${target.user.username}`)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '🏆 Niveau', value: `**${userData.level}**`, inline: true },
        { name: '✨ XP', value: `**${userData.xp}** / ${needed}`, inline: true },
        { name: '💬 Messages', value: `**${userData.messages}**`, inline: true },
        { name: '📊 Progression', value: `\`[${bar}]\`` },
      )
      .setFooter({ text: 'Gagnez de l\'XP en envoyant des messages !' });

    await interaction.reply({ embeds: [embed] });
  },
};
