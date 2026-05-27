const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { verifierTwitch } = require('../../events/twitch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('testtwitch')
    .setDescription('🧪 Force la vérification Twitch maintenant')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, client) {
    await interaction.reply({ content: '🔍 Vérification Twitch en cours...', ephemeral: true });
    await verifierTwitch(client, true);
    await interaction.editReply({ content: '✅ Vérification terminée ! Regarde le salon #live-twitch.', ephemeral: true });
  },
};