const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('aide')
    .setDescription('📖 Affiche toutes les commandes de 369 Bot'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x7c3aed)
      .setTitle('✨ 369 Bot — Liste des commandes')
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .addFields(
        {
          name: '🛠️ Utilitaires',
          value: [
            '`/ping` — Latence du bot',
          ].join('\n'),
        },
        {
          name: '🔴 Twitch',
          value: [
            '`/ajouterstream [login] [nom]` — Ajouter un streameur',
            '`/retirerstream [login]` — Retirer un streameur',
            '`/streamers` — Liste tous les streameurs surveillés',
            '`/setchannel [type] [salon]` — Configurer les salons Twitch',
            '`/testtwitch` — Force la vérification Twitch',
          ].join('\n'),
        }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
