const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getLeaderboard } = require('../../utils/xp');

const medals = ['🥇', '🥈', '🥉'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('classement')
    .setDescription('🏆 Top 10 des membres par XP'),

  async execute(interaction) {
    const top = getLeaderboard(interaction.guild.id, 10);

    if (!top.length) {
      return interaction.reply('❌ Personne n\'a encore de XP sur ce serveur !');
    }

    const lines = top.map((entry, i) => {
      const medal = medals[i] || `**${i + 1}.**`;
      return `${medal} <@${entry.userId}> — Niveau **${entry.level}** · ${entry.messages} messages`;
    });

    const embed = new EmbedBuilder()
      .setColor(0xf59e0b)
      .setTitle(`🏆 Classement de ${interaction.guild.name}`)
      .setDescription(lines.join('\n'))
      .setFooter({ text: 'Envoyez des messages pour gagner de l\'XP !' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
