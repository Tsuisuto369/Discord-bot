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
          name: '🎲 Fun & Jeux',
          value: [
            '`/pile-ou-face` — Lancez une pièce',
            '`/des [faces]` — Lancez un dé (défaut: 20)',
            '`/blague` — Une blague aléatoire',
            '`/citation` — Une citation inspirante',
            '`/quiz` — Question culture générale',
            '`/8ball [question]` — La boule magique répond',
          ].join('\n'),
        },
        {
          name: '📊 XP & Niveaux',
          value: [
            '`/rang [@membre]` — Voir votre niveau XP',
            '`/classement` — Top 10 du serveur',
          ].join('\n'),
        },
        {
          name: '🛠️ Utilitaires',
          value: [
            '`/météo [ville]` — Météo en temps réel',
            '`/serverinfo` — Infos du serveur',
            '`/userinfo [@membre]` — Infos d\'un membre',
            '`/ping` — Latence du bot',
          ].join('\n'),
        },
        {
          name: '🔨 Modération',
          value: [
            '`/kick @membre [raison]` — Expulser',
            '`/ban @membre [raison]` — Bannir',
            '`/clear [nombre]` — Supprimer des messages',
          ].join('\n'),
        },
        {
          name: '🔴 Twitch',
          value: [
            '`/ajouterstream [login] [nom]` — Ajouter un streameur',
            '`/retirerstream [login]` — Retirer un streameur',
            '`/streamers` — Liste tous les streameurs surveillés',
          ].join('\n'),
        }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};