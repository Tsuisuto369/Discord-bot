const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const reponses = [
  { text: 'Absolument !', color: 0x22c55e, emoji: '✅' },
  { text: 'C\'est certain.', color: 0x22c55e, emoji: '✅' },
  { text: 'Sans aucun doute.', color: 0x22c55e, emoji: '✅' },
  { text: 'Oui, définitivement.', color: 0x22c55e, emoji: '✅' },
  { text: 'Tu peux compter dessus.', color: 0x22c55e, emoji: '✅' },
  { text: 'Les signes pointent vers oui.', color: 0x86efac, emoji: '🟢' },
  { text: 'C\'est très probable.', color: 0x86efac, emoji: '🟢' },
  { text: 'Les perspectives sont favorables.', color: 0x86efac, emoji: '🟢' },
  { text: 'Je ne peux pas te le dire maintenant…', color: 0xf59e0b, emoji: '🤔' },
  { text: 'Demande plus tard.', color: 0xf59e0b, emoji: '🤔' },
  { text: 'Mieux vaut ne pas le savoir.', color: 0xf59e0b, emoji: '🤔' },
  { text: 'Difficile à dire.', color: 0xf59e0b, emoji: '🤔' },
  { text: 'Les perspectives ne sont pas bonnes.', color: 0xef4444, emoji: '❌' },
  { text: 'Non.', color: 0xef4444, emoji: '❌' },
  { text: 'Très peu probable.', color: 0xef4444, emoji: '❌' },
  { text: 'Mes sources disent non.', color: 0xef4444, emoji: '❌' },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('🎱 Pose une question à la boule magique')
    .addStringOption(opt =>
      opt.setName('question').setDescription('Ta question').setRequired(true)
    ),

  async execute(interaction) {
    const question = interaction.options.getString('question');
    const rep = reponses[Math.floor(Math.random() * reponses.length)];

    const embed = new EmbedBuilder()
      .setColor(rep.color)
      .setTitle('🎱 La Boule Magique')
      .addFields(
        { name: '❓ Question', value: question },
        { name: `${rep.emoji} Réponse`, value: `**${rep.text}**` }
      )
      .setFooter({ text: `Demandé par ${interaction.user.username}` });

    await interaction.reply({ embeds: [embed] });
  },
};
