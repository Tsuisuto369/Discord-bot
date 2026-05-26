const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('🔨 Bannir un membre du serveur')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(opt =>
      opt.setName('membre').setDescription('Le membre à bannir').setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('raison').setDescription('Raison du bannissement').setRequired(false)
    )
    .addIntegerOption(opt =>
      opt.setName('jours').setDescription('Supprimer les messages des X derniers jours (0-7)').setMinValue(0).setMaxValue(7).setRequired(false)
    ),

  async execute(interaction) {
    const target = interaction.options.getMember('membre');
    const raison = interaction.options.getString('raison') ?? 'Aucune raison fournie';
    const jours = interaction.options.getInteger('jours') ?? 0;

    if (!target) return interaction.reply({ content: '❌ Membre introuvable.', ephemeral: true });
    if (!target.bannable) return interaction.reply({ content: '❌ Je ne peux pas bannir ce membre.', ephemeral: true });
    if (target.id === interaction.user.id) return interaction.reply({ content: '❌ Vous ne pouvez pas vous bannir vous-même.', ephemeral: true });

    try {
      await target.ban({ deleteMessageDays: jours, reason: raison });

      const embed = new EmbedBuilder()
        .setColor(0xef4444)
        .setTitle('🔨 Membre banni')
        .addFields(
          { name: '👤 Membre', value: `${target.user.tag}`, inline: true },
          { name: '🔨 Modérateur', value: `${interaction.user.tag}`, inline: true },
          { name: '📝 Raison', value: raison },
          { name: '🗑️ Messages supprimés', value: `${jours} jour(s)`, inline: true },
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch {
      await interaction.reply({ content: '❌ Impossible de bannir ce membre.', ephemeral: true });
    }
  },
};
