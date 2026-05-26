const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('📊 Affiche les informations du serveur'),

  async execute(interaction) {
    const guild = interaction.guild;
    await guild.members.fetch();

    const bots = guild.members.cache.filter(m => m.user.bot).size;
    const humans = guild.memberCount - bots;

    const embed = new EmbedBuilder()
      .setColor(0x7c3aed)
      .setTitle(`📊 ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: '👑 Propriétaire', value: `<@${guild.ownerId}>`, inline: true },
        { name: '📅 Créé le', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
        { name: '🌍 Région', value: guild.preferredLocale || 'Inconnue', inline: true },
        { name: '👥 Membres', value: `${humans} humains · ${bots} bots`, inline: true },
        { name: '💬 Salons', value: `${guild.channels.cache.size}`, inline: true },
        { name: '🎭 Rôles', value: `${guild.roles.cache.size}`, inline: true },
        { name: '😀 Emojis', value: `${guild.emojis.cache.size}`, inline: true },
        { name: '🔒 Vérification', value: guild.verificationLevel.toString(), inline: true },
      )
      .setFooter({ text: `ID : ${guild.id}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
