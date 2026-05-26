const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('des')
    .setDescription('🎲 Lance un dé')
    .addIntegerOption(opt =>
      opt.setName('faces').setDescription('Nombre de faces (défaut: 6)').setRequired(false).setMinValue(2).setMaxValue(1000)
    )
    .addIntegerOption(opt =>
      opt.setName('nombre').setDescription('Combien de dés (défaut: 1)').setRequired(false).setMinValue(1).setMaxValue(10)
    ),

  async execute(interaction) {
    const faces = interaction.options.getInteger('faces') ?? 6;
    const count = interaction.options.getInteger('nombre') ?? 1;

    const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * faces) + 1);
    const total = rolls.reduce((a, b) => a + b, 0);

    const embed = new EmbedBuilder()
      .setColor(0x6366f1)
      .setTitle(`🎲 Lancer de ${count}d${faces}`)
      .setDescription(count > 1
        ? `Résultats : **${rolls.join(', ')}**\nTotal : **${total}**`
        : `Résultat : **${rolls[0]}**`
      )
      .setFooter({ text: `Lancé par ${interaction.user.username}` });

    await interaction.reply({ embeds: [embed] });
  },
};
