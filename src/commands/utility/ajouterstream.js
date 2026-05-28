const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createClient } = require('@supabase/supabase-js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ajouterstream')
    .setDescription('➕ Ajouter un streameur Twitch à surveiller')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(opt =>
      opt.setName('login').setDescription('Login Twitch (ex: mrtiboute)').setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('nom').setDescription('Nom affiché (ex: MrTiboute)').setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('emoji').setDescription('Emoji (ex: 👻)').setRequired(false)
    ),

  async execute(interaction) {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const login = interaction.options.getString('login').toLowerCase();
    const nom = interaction.options.getString('nom');
    const emoji = interaction.options.getString('emoji') || '🎮';

    const { error } = await supabase
      .from('streameurs')
      .insert({ login, nom, emoji });

    if (error) {
      if (error.code === '23505') {
        return interaction.reply({ content: `❌ **${nom}** est déjà dans la liste !`, ephemeral: true });
      }
      return interaction.reply({ content: '❌ Erreur lors de l\'ajout.', ephemeral: true });
    }

    await interaction.reply({ content: `✅ **${nom}** ${emoji} a été ajouté à la surveillance Twitch !` });
  },
};