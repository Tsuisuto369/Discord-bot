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
  'Qu\'est-ce qu\'un hippopotame ? Un hippopotame.',
  'Pourquoi Superman porte-t-il son slip par-dessus son pantalon ?\nPour savoir dans quel sens le mettre.',
  'Comment appelle-t-on un boomerang qui ne revient pas ?\nUn bâton.',
  'Un escargot monte dans un taxi. Le chauffeur dit : "C\'est pour aller où ?"\nL\'escargot : "Vite, vite !"',
  'Qu\'est-ce qu\'un crocodile qui surveille des légumes ?\nUn garde-courgettes.',
  'Pourquoi les squelettes ne se battent-ils jamais entre eux ?\nIls n\'ont pas le cran.',
  'Comment appelle-t-on un chat qui fait de la musique ?\nUn chat-nteur.',
  'Mon chien s\'appelle "Cinq kilomètres". Hier je l\'ai promené et j\'ai dit à tout le monde : "J\'ai fait cinq kilomètres."\nTout le monde était impressionné.',
  'Pourquoi les poissons nagent-ils dans l\'eau salée ?\nParce que le poivre les ferait éternuer.',
  'Que dit un escargot croisé par une limace ?\n"Waouh, un camping-car !"',
  'Comment appelle-t-on un chien sans pattes ?\nPeu importe, il ne viendra pas de toute façon.',
  'Un homme entre dans une bibliothèque et demande : "Avez-vous des livres sur la paranoïa ?"\nLa bibliothécaire lui chuchote : "Ils sont juste derrière vous !"',
  'Qu\'est-ce qu\'un caniche croisé avec un canari ?\nUn canon.',
  'Pourquoi les vaches ont-elles des sonnettes ?\nParce que leurs cornes ne fonctionnent pas.',
  'Comment appelle-t-on un chien qui a chaud ?\nUn hot-dog.',
  'Pourquoi les arbres ne mangent-ils jamais ?\nParce qu\'ils ont déjà leurs feuilles.',
  'Qu\'est-ce qu\'un Belge avec une brique sur la tête ?\nUn brickeur.',
  'Comment s\'appelle un canif suisse ?\nUn canif qui fait tout.',
  'Un homme dit à son médecin : "Docteur, je me prends pour un chien."\nLe médecin répond : "Allongez-vous sur ce divan."\nL\'homme : "Je n\'ai pas le droit de monter sur les meubles."',
  'Quelle est la différence entre un verre de lait et un enfant ?\nLe verre de lait, on peut le laisser seul sans qu\'il pleure.',
  'Pourquoi les informaticiens confondent-ils Halloween et Noël ?\nParce que OCT 31 = DEC 25.',
  'Comment appelle-t-on un chat qui tombe dans un escalier ?\nChatdégringole.',
  'Qu\'est-ce qu\'un crocodile qui fait la vaisselle ?\nUn croco-propre.',
  'Un enfant demande à son père : "Papa, comment on fait les bébés ?"\nLe père : "Euh... la cigogne les apporte."\nL\'enfant : "Et qui fait les cigognes ?"',
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
