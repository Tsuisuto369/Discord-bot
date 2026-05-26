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
