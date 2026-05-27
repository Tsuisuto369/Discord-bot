const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const citations = [
  { text: 'La vie, c\'est comme une bicyclette, il faut avancer pour ne pas perdre l\'équilibre.', auteur: 'Albert Einstein' },
  { text: 'Le succès, c\'est d\'aller d\'échec en échec sans perdre son enthousiasme.', auteur: 'Winston Churchill' },
  { text: 'La créativité, c\'est l\'intelligence qui s\'amuse.', auteur: 'Albert Einstein' },
  { text: 'Soyez le changement que vous voulez voir dans le monde.', auteur: 'Mahatma Gandhi' },
  { text: 'L\'imagination est plus importante que le savoir.', auteur: 'Albert Einstein' },
  { text: 'Je ne perds jamais. Soit je gagne, soit j\'apprends.', auteur: 'Nelson Mandela' },
  { text: 'La seule façon de faire du bon travail est d\'aimer ce que vous faites.', auteur: 'Steve Jobs' },
  { text: 'Chaque expert a été un jour un débutant.', auteur: 'Helen Hayes' },
  { text: 'Le meilleur moment pour planter un arbre, c\'était il y a 20 ans. Le deuxième meilleur moment, c\'est maintenant.', auteur: 'Proverbe chinois' },
  { text: 'Vis comme si tu devais mourir demain. Apprends comme si tu devais vivre toujours.', auteur: 'Mahatma Gandhi' },
  { text: 'Les obstacles sont ces choses effrayantes que l\'on voit quand on détourne les yeux de son objectif.', auteur: 'Henry Ford' },
  { text: 'Il faut toujours viser la lune, car même en cas d\'échec, on atterrit dans les étoiles.', auteur: 'Oscar Wilde' },
  { text: 'Le bonheur n\'est pas quelque chose de prêt à l\'emploi. Il vient de vos propres actions.', auteur: 'Dalaï Lama' },
  { text: 'La vraie générosité envers l\'avenir consiste à tout donner au présent.', auteur: 'Albert Camus' },
  { text: 'On ne voit bien qu\'avec le cœur. L\'essentiel est invisible pour les yeux.', auteur: 'Antoine de Saint-Exupéry' },
  { text: 'Ce que nous sommes est le résultat de ce que nous avons pensé.', auteur: 'Bouddha' },
  { text: 'La vie est courte, l\'art est long, l\'occasion fugitive, l\'expérience trompeuse, le jugement difficile.', auteur: 'Hippocrate' },
  { text: 'Celui qui déplace des montagnes commence par enlever les petites pierres.', auteur: 'Confucius' },
  { text: 'Le courage n\'est pas l\'absence de peur, mais la capacité de la surmonter.', auteur: 'Nelson Mandela' },
  { text: 'Si vous ne pouvez pas voler, courez. Si vous ne pouvez pas courir, marchez. Si vous ne pouvez pas marcher, rampez. Quoi qu\'il en soit, continuez d\'avancer.', auteur: 'Martin Luther King' },
  { text: 'La simplicité est la sophistication suprême.', auteur: 'Léonard de Vinci' },
  { text: 'Ce n\'est pas parce que les choses sont difficiles que nous n\'osons pas, c\'est parce que nous n\'osons pas qu\'elles sont difficiles.', auteur: 'Sénèque' },
  { text: 'L\'éducation est l\'arme la plus puissante que vous puissiez utiliser pour changer le monde.', auteur: 'Nelson Mandela' },
  { text: 'Nos vies commencent à toucher à leur fin le jour où nous gardons le silence sur les choses qui comptent.', auteur: 'Martin Luther King' },
  { text: 'Deux choses sont infinies : l\'univers et la bêtise humaine. Mais pour l\'univers, je n\'en suis pas encore sûr.', auteur: 'Albert Einstein' },
  { text: 'L\'homme qui déplace une montagne commence par porter de petites pierres.', auteur: 'Confucius' },
  { text: 'Le talent, c\'est d\'avoir envie de faire quelque chose.', auteur: 'Jacques Brel' },
  { text: 'Ne jugez pas chaque journée par la récolte que vous faites, mais par les graines que vous plantez.', auteur: 'Robert Louis Stevenson' },
  { text: 'Il n\'est jamais trop tard pour devenir ce que vous auriez pu être.', auteur: 'George Eliot' },
  { text: 'La persévérance est la vertu des forts.', auteur: 'Victor Hugo' },
  { text: 'Le secret de la réussite est de savoir quelque chose que personne d\'autre ne sait.', auteur: 'Aristote Onassis' },
  { text: 'Pour chaque minute passée en colère, vous perdez soixante secondes de bonheur.', auteur: 'Ralph Waldo Emerson' },
  { text: 'Celui qui n\'a pas d\'objectifs ne risque pas de les atteindre.', auteur: 'Sun Tzu' },
  { text: 'La vie n\'est pas de trouver qui vous êtes. La vie est de vous créer.', auteur: 'George Bernard Shaw' },
  { text: 'La meilleure façon de prédire l\'avenir, c\'est de l\'inventer.', auteur: 'Alan Kay' },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('citation')
    .setDescription('💭 Une citation inspirante aléatoire'),

  async execute(interaction) {
    const cit = citations[Math.floor(Math.random() * citations.length)];

    const embed = new EmbedBuilder()
      .setColor(0x8b5cf6)
      .setTitle('💭 Citation inspirante')
      .setDescription(`*"${cit.text}"*`)
      .setFooter({ text: `— ${cit.auteur}` });

    await interaction.reply({ embeds: [embed] });
  },
};
