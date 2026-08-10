const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const supabase = require('../../utils/supabase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setchannel')
    .setDescription('⚙️ Configurer les salons Twitch de ce serveur')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(opt =>
      opt.setName('type')
        .setDescription('Quel salon configurer')
        .setRequired(true)
        .addChoices(
          { name: 'Annonce de live', value: 'annonce' },
          { name: 'Fin de live', value: 'fin' },
        )
    )
    .addChannelOption(opt =>
      opt.setName('salon')
        .setDescription('Le salon à utiliser')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),

  async execute(interaction) {
    const type = interaction.options.getString('type');
    const salon = interaction.options.getChannel('salon');
    const column = type === 'annonce' ? 'announce_channel_id' : 'fin_channel_id';

    const { error } = await supabase
      .from('settings')
      .upsert({ guild_id: interaction.guild.id, [column]: salon.id }, { onConflict: 'guild_id' });

    if (error) {
      console.error('Erreur setchannel:', error.message);
      return interaction.reply({ content: '❌ Erreur lors de la configuration.', ephemeral: true });
    }

    const label = type === 'annonce' ? "d'annonce des lives" : 'de fin de live';
    await interaction.reply({ content: `✅ Le salon ${salon} est maintenant le salon ${label} !` });
  },
};
