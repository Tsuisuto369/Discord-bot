const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('🏓 Affiche la latence du bot'),

  async execute(interaction) {
    const sent = await interaction.reply({ content: '📡 Calcul en cours...', fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    const color = latency < 100 ? 0x22c55e : latency < 300 ? 0xf59e0b : 0xef4444;

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle('🏓 Pong !')
      .addFields(
        { name: '⚡ Latence bot', value: `\`${latency}ms\``, inline: true },
        { name: '📡 API Discord', value: `\`${apiLatency}ms\``, inline: true }
      );

    await interaction.editReply({ content: null, embeds: [embed] });
  },
};
