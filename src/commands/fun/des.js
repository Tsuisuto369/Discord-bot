const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('des')
    .setDescription('🎲 Lance un dé')
    .addIntegerOption(opt =>
      opt.setName('faces').setDescription('Nombre de faces (défaut: 20)').setRequired(false).setMinValue(2).setMaxValue(1000)
    ),

  async execute(interaction) {
    const faces = interaction.options.getInteger('faces') ?? 20;

    const result = Math.floor(Math.random() * faces) + 1;

    const embed = new EmbedBuilder()
      .setColor(0x6366f1)
      .setTitle(`🎲 Lancer de 1d${faces}`)
      .setDescription(`Résultat : **${result}**`)
      .setFooter({ text: `Lancé par ${interaction.user.username}` });

    await interaction.reply({ embeds: [embed] });
  },
};