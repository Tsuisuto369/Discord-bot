const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// ─── Pile ou Face ─────────────────────────────────────────────────────────────
module.exports = {
  data: new SlashCommandBuilder()
    .setName('pile-ou-face')
    .setDescription('🪙 Lance une pièce !'),

  async execute(interaction) {
    const result = Math.random() < 0.5 ? 'Pile' : 'Face';
    const emoji = result === 'Pile' ? '🪙' : '✨';

    const embed = new EmbedBuilder()
      .setColor(0xf59e0b)
      .setTitle(`${emoji} ${result} !`)
      .setDescription(`La pièce a atterri sur **${result}** !`)
      .setFooter({ text: `Lancé par ${interaction.user.username}` });

    await interaction.reply({ embeds: [embed] });
  },
};
