const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { verifierYoutube } = require('../../../src/events/youtube');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('testyoutube')
    .setDescription('🧪 Force la vérification YouTube maintenant')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, client) {
    await interaction.reply({ content: '🔍 Vérification en cours...', ephemeral: true });
    await verifierYoutube(client);
    await interaction.editReply({ content: '✅ Vérification terminée ! Regarde le salon #vidéos-youtube.', ephemeral: true });
  },
};