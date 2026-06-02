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
  // Nouvelles blagues
  'Pourquoi les fantômes ne mentent-ils jamais ?\nParce qu\'on voit à travers eux.',
  'Qu\'est-ce qu\'un crocodile qui fait du vélo ?\nUn croco-cycliste.',
  'Un homme appelle les pompiers : "Au secours, ma maison brûle !"\nLe pompier : "Comment on y accède ?"\nL\'homme : "Ben... par la porte d\'entrée, comme tout le monde !"',
  'Qu\'est-ce qu\'un Schtroumpf qui tombe d\'une falaise ?\nUn Schtroumpf-écrasé.',
  'Comment appelle-t-on un chat qui habite dans une épicerie ?\nUn chat-landais.',
  'Pourquoi les plantes ne vont-elles jamais à l\'école ?\nParce qu\'elles font déjà de la photosynthèse.',
  'Un patient dit au psychiatre : "Docteur, je me prends pour des rideaux."\nLe psychiatre : "Ressaisissez-vous !"',
  'Qu\'est-ce qu\'un canif dans la neige ?\nUn canif-gelé.',
  'Pourquoi les mathématiciens ont-ils peur des forêts ?\nParce qu\'il y a trop de log.',
  'Comment appelle-t-on un pingouin dans le désert ?\nPerdu.',
  'Un homme va au restaurant et dit au serveur : "Il y a une mouche dans ma soupe !"\nLe serveur : "Ne criez pas, tout le monde va en vouloir une !"',
  'Qu\'est-ce qu\'un chat qui fait de la randonnée ?\nUn chat-marcheur.',
  'Pourquoi les lions mangent-ils cru ?\nParce qu\'ils ne savent pas cuisiner.',
  'Comment appelle-t-on un chien dans une fusée ?\nUn astronau-toutou.',
  'Quelle est la différence entre une pizza et un musicien ?\nUne pizza peut faire vivre une famille.',
  'Pourquoi les cannibales n\'aiment-ils pas manger les clowns ?\nParce qu\'ils ont un goût bizarre.',
  'Comment appelle-t-on un cerf sans yeux ?\nPas d\'idée (no eye deer).',
  'Qu\'est-ce qu\'un zombie végétarien ?\nIl mange des "graaaaains" au lieu des "cerveeeeaux".',
  'Un homme entre dans un bar et commande 10 verres de whisky.\nLe barman : "C\'est pour fêter quelque chose ?"\nL\'homme : "Mon premier rapport sexuel !"\nLe barman : "Félicitations ! Pourquoi 10 verres alors ?"\nL\'homme : "Pour oublier l\'odeur."',
  'Pourquoi les footballeurs sont-ils de mauvais musiciens ?\nParce qu\'ils ne savent pas tenir la note.',
  'Comment appelle-t-on un chat qui travaille à la mairie ?\nUn chat-fonctionnaire.',
  'Qu\'est-ce que deux anténistes qui se disputent ?\nUne mauvaise réception.',
  'Pourquoi les éléphants n\'utilisent-ils pas d\'ordinateurs ?\nParce qu\'ils ont peur de la souris.',
  'Un homme dit à son psy : "J\'ai l\'impression que personne ne m\'écoute."\nLe psy : "Suivant !"',
  'Comment appelle-t-on une ceinture en diamants ?\nUne perte de taille.',
  'Qu\'est-ce qu\'un canif dans l\'espace ?\nUn canif-stellaire.',
  'Pourquoi les vamps sont-ils mauvais en maths ?\nParce qu\'ils ne peuvent pas compter jusqu\'à l\'infini sans s\'arrêter pour boire.',
  'Comment appelle-t-on un chien magicien ?\nUn labra-cadabra-dor.',
  'Qu\'est-ce qu\'un chat sur une plage ?\nUn chat-blonnard.',
  'Pourquoi les plongeurs portent-ils une combinaison noire ?\nPour ne pas être confondus avec des baguettes de pain.',
  'Un fils demande à son père : "Papa, c\'est quoi un alcoolique ?"\nLe père : "Tu vois les 4 arbres là-bas ?"\nLe fils : "Mais il n\'y en a que 2..."\nLe père : "Tu vois, t\'es pas alcoolique."',
  'Comment appelle-t-on un Espagnol qui a perdu sa voiture ?\nCarlos.',
  'Qu\'est-ce qu\'un crocodile qui surveille un parking ?\nUn croco-gardien.',
  'Pourquoi les abeilles ont-elles du miel dans leurs ruches ?\nParce que si c\'était du beurre, ça s\'appellerait des vaches.',
  'Comment appelle-t-on un chat amoureux ?\nUn chat-mour.',
  'Un homme dit à un autre : "Tu savais que 4 personnes sur 5 souffrent de diarrhée ?"\nL\'autre répond : "Donc une en profite ?"',
  'Qu\'est-ce qu\'un canif dans un film d\'horreur ?\nUn canif-reux.',
  'Pourquoi les scientifiques ne font-ils jamais confiance aux atomes ?\nParce qu\'ils constituent tout.',
  'Comment appelle-t-on un chat qui joue au foot ?\nUn chat-mpion.',
  'Un professeur demande à ses élèves : "Qui peut me donner un exemple de phrase avec le mot \'déficit\' ?"\nUn élève lève la main : "J\'ai déficit de l\'argent à la fin du mois."',
  'Qu\'est-ce qu\'un crocodile qui lit des livres ?\nUn croco-lit.',
  'Pourquoi les musiciens sont-ils si calmes ?\nParce qu\'ils savent garder la mesure.',
  'Comment appelle-t-on un chat qui fait du skateboard ?\nUn chat-rider.',
  'Un homme va chez le médecin et dit : "J\'ai mal partout."\nIl touche son genou, "Aïe !"\nIl touche son coude, "Aïe !"\nIl touche sa tête, "Aïe !"\nLe médecin : "Vous avez le doigt cassé."',
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