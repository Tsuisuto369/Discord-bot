const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('🧹 Supprimer des messages en masse')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(opt =>
      opt.setName('nombre').setDescription('Nombre de messages à supprimer (1-100)').setRequired(true).setMinValue(1).setMaxValue(100)
    )
    .addUserOption(opt =>
      opt.setName('membre').setDescription('Supprimer uniquement les messages de ce membre').setRequired(false)
    ),

  async execute(interaction) {
    const nombre = interaction.options.getInteger('nombre');
    const target = interaction.options.getUser('membre');

    await interaction.deferReply({ ephemeral: true });

    try {
      let messages = await interaction.channel.messages.fetch({ limit: 100 });

      if (target) {
        messages = messages.filter(m => m.author.id === target.id);
      }

      messages = [...messages.values()].slice(0, nombre);

      const deleted = await interaction.channel.bulkDelete(messages, true);

      const embed = new EmbedBuilder()
        .setColor(0x22c55e)
        .setTitle('🧹 Messages supprimés')
        .setDescription(`**${deleted.size}** message(s) supprimé(s)${target ? ` de ${target.tag}` : ''}.`)
        .setFooter({ text: `Par ${interaction.user.tag}` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await interaction.editReply({ content: '❌ Erreur : les messages de plus de 14 jours ne peuvent pas être supprimés en masse.' });
    }
  },
};
