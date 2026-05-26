const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const questions = [
  { question: 'Quelle est la capitale de l\'Australie ?', reponses: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], bonne: 2 },
  { question: 'En quelle année a été fondée la société Apple ?', reponses: ['1972', '1976', '1984', '1980'], bonne: 1 },
  { question: 'Quel est le plus grand océan du monde ?', reponses: ['Atlantique', 'Indien', 'Arctique', 'Pacifique'], bonne: 3 },
  { question: 'Combien d\'os y a-t-il dans le corps humain adulte ?', reponses: ['206', '198', '212', '186'], bonne: 0 },
  { question: 'Qui a peint la Joconde ?', reponses: ['Michel-Ange', 'Raphaël', 'Léonard de Vinci', 'Botticelli'], bonne: 2 },
  { question: 'Quel est le symbole chimique de l\'or ?', reponses: ['Go', 'Or', 'Gd', 'Au'], bonne: 3 },
  { question: 'Quelle est la planète la plus proche du Soleil ?', reponses: ['Vénus', 'Mercure', 'Mars', 'Terre'], bonne: 1 },
  { question: 'En quelle année a eu lieu la Révolution Française ?', reponses: ['1789', '1776', '1804', '1799'], bonne: 0 },
  { question: 'Quel pays est le plus grand du monde en superficie ?', reponses: ['Canada', 'Chine', 'États-Unis', 'Russie'], bonne: 3 },
  { question: 'Qui a écrit "Les Misérables" ?', reponses: ['Gustave Flaubert', 'Victor Hugo', 'Émile Zola', 'Honoré de Balzac'], bonne: 1 },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quiz')
    .setDescription('🧠 Une question de culture générale !'),

  async execute(interaction) {
    const q = questions[Math.floor(Math.random() * questions.length)];

    const embed = new EmbedBuilder()
      .setColor(0x06b6d4)
      .setTitle('🧠 Quiz Culture Générale')
      .setDescription(`**${q.question}**`)
      .setFooter({ text: 'Vous avez 30 secondes !' });

    const letters = ['🇦', '🇧', '🇨', '🇩'];
    const row = new ActionRowBuilder().addComponents(
      q.reponses.map((rep, i) =>
        new ButtonBuilder()
          .setCustomId(`quiz_${i}`)
          .setLabel(`${['A', 'B', 'C', 'D'][i]}. ${rep}`)
          .setStyle(ButtonStyle.Secondary)
      )
    );

    const msg = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

    const filter = i => i.customId.startsWith('quiz_') && i.user.id === interaction.user.id;
    let collector;
    try {
      collector = msg.createMessageComponentCollector({ filter, time: 30_000, max: 1 });
    } catch {
      return;
    }

    collector.on('collect', async i => {
      const chosen = parseInt(i.customId.split('_')[1]);
      const correct = chosen === q.bonne;

      const resultEmbed = new EmbedBuilder()
        .setColor(correct ? 0x22c55e : 0xef4444)
        .setTitle(correct ? '✅ Bonne réponse !' : '❌ Mauvaise réponse !')
        .setDescription(`**${q.question}**`)
        .addFields({ name: 'Bonne réponse', value: `**${q.reponses[q.bonne]}**` });

      await i.update({ embeds: [resultEmbed], components: [] });
    });

    collector.on('end', async (collected) => {
      if (collected.size === 0) {
        const timeoutEmbed = new EmbedBuilder()
          .setColor(0xf59e0b)
          .setTitle('⏱️ Temps écoulé !')
          .setDescription(`La bonne réponse était : **${q.reponses[q.bonne]}**`);
        interaction.editReply({ embeds: [timeoutEmbed], components: [] }).catch(() => {});
      }
    });
  },
};
