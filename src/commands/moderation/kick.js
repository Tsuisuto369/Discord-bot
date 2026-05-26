const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('👢 Expulser un membre du serveur')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(opt =>
      opt.setName('membre').setDescription('Le membre à expulser').setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('raison').setDescription('Raison de l\'expulsion').setRequired(false)
    ),

  async execute(interaction) {
    const target = interaction.options.getMember('membre');
    const raison = interaction.options.getString('raison') ?? 'Aucune raison fournie';

    if (!target) return interaction.reply({ content: '❌ Membre introuvable.', ephemeral: true });
    if (!target.kickable) return interaction.reply({ content: '❌ Je ne peux pas expulser ce membre.', ephemeral: true });
    if (target.id === interaction.user.id) return interaction.reply({ content: '❌ Vous ne pouvez pas vous expulser vous-même.', ephemeral: true });

    try {
      await target.kick(raison);

      const embed = new EmbedBuilder()
        .setColor(0xf59e0b)
        .setTitle('👢 Membre expulsé')
        .addFields(
          { name: '👤 Membre', value: `${target.user.tag}`, inline: true },
          { name: '🔨 Modérateur', value: `${interaction.user.tag}`, inline: true },
          { name: '📝 Raison', value: raison },
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch {
      await interaction.reply({ content: '❌ Impossible d\'expulser ce membre.', ephemeral: true });
    }
  },
};
