const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('🖼️ Affiche l\'avatar d\'un membre en grand')
    .addUserOption(opt =>
      opt.setName('membre').setDescription('Le membre').setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('membre') || interaction.user;
    const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = new EmbedBuilder()
      .setColor(0x7c3aed)
      .setTitle(`🖼️ Avatar de ${user.username}`)
      .setImage(avatarUrl)
      .addFields({ name: '🔗 Lien direct', value: `[Ouvrir](${avatarUrl})` });

    await interaction.reply({ embeds: [embed] });
  },
};
