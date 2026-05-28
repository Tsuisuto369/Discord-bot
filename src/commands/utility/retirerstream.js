const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('retirerstream')
    .setDescription('➖ Retirer un streameur Twitch de la surveillance')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(opt =>
      opt.setName('login').setDescription('Login Twitch (ex: mrtiboute)').setRequired(true)
    ),

  async execute(interaction) {
    const login = interaction.options.getString('login').toLowerCase();

    const { data, error } = await supabase
      .from('streameurs')
      .delete()
      .eq('login', login)
      .select();

    if (error || !data?.length) {
      return interaction.reply({ content: `❌ Streameur **${login}** introuvable dans la liste.`, ephemeral: true });
    }

    await interaction.reply({ content: `✅ **${data[0].nom}** a été retiré de la surveillance Twitch !` });
  },
};