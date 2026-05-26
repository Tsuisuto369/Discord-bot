const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const blagues = [
  'Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?\nParce que sinon ils tomberaient dans le bateau.',
  'Un homme rentre chez lui et dit à sa femme : "Chérie, j\'ai gagné à la loterie ! Prépare ta valise !"\nSa femme : "Où on va ?"\nLui : "Je sais pas, mais toi tu dégages !"',
  'C\'est l\'histoire d\'une frite qui se noie… Ses copines crient : "Quelqu\'un sait nager ?" L\'une d\'elles répond : "Non mais on peut souffler dessus !"',
  'Quelle est la différence entre un crocodile ?\nPas de différence entre les deux côtés.',
  'Deux antennes se marient. La cérémonie était nulle mais la réception était excellente.',
  'Comment appelle-t-on un chat tombé dans un pot de peinture le jour de Noël ?\nUn chat-peint de Noël.',
  'Un homme va voir son médecin : "Docteur, j\'avale des billes chaque matin." Le médecin : "Et alors ?" L\'homme : "Je commence à perdre la boule !"',
  'Qu\'est-ce qu\'un canif ? Un petit fien.',
  'Comment s\'appelle un chat qui mange des citrons ? Un chat-grin.',
  'Pourquoi les Belges mettent-ils leur réveil à 7h58 ? Parce qu\'ils ne veulent pas être réveillés à une heure aussi matinale que 8h.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blague')
    .setDescription('😂 Une blague aléatoire !'),

  async execute(interaction) {
    const blague = blagues[Math.floor(Math.random() * blagues.length)];
    const parts = blague.split('\n');

    const embed = new EmbedBuilder()
      .setColor(0xf59e0b)
      .setTitle('😂 Blague du moment')
      .setDescription(parts[0])
      .setFooter({ text: parts[1] || '😄' });

    await interaction.reply({ embeds: [embed] });
  },
};
