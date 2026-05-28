const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { createClient } = require('@supabase/supabase-js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('streamers')
    .setDescription('📋 Liste tous les streameurs surveillés'),

  async execute(interaction) {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const { data: streameurs, error } = await supabase
      .from('streameurs')
      .select('*')
      .order('nom');

    if (error || !streameurs?.length) {
      return interaction.reply({ content: '❌ Aucun streameur en surveillance.', ephemeral: true });
    }

    const liste = streameurs.map(s =>
      `${s.emoji} **${s.nom}** — [${s.login}](https://twitch.tv/${s.login}) ${s.en_live ? '🔴 En live !' : '⚫ Hors ligne'}`
    ).join('\n');

    const embed = new EmbedBuilder()
      .setColor(0x9146ff)
      .setTitle('📋 Streameurs surveillés')
      .setDescription(liste)
      .setFooter({ text: `${streameurs.length} streameur(s) au total` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};