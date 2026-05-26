const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

const weatherEmojis = {
  Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️',
  Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️',
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('météo')
    .setDescription('🌤️ Météo d\'une ville en temps réel')
    .addStringOption(opt =>
      opt.setName('ville').setDescription('Nom de la ville').setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const city = interaction.options.getString('ville');
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return interaction.editReply('⚠️ La clé API OpenWeather n\'est pas configurée. Ajoutez `OPENWEATHER_API_KEY` dans vos variables d\'environnement.');
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=fr`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        return interaction.editReply(`❌ Ville introuvable : **${city}**`);
      }

      const emoji = weatherEmojis[data.weather[0].main] || '🌡️';
      const embed = new EmbedBuilder()
        .setColor(0x3b82f6)
        .setTitle(`${emoji} Météo à ${data.name}, ${data.sys.country}`)
        .setDescription(`*${data.weather[0].description}*`)
        .addFields(
          { name: '🌡️ Température', value: `${Math.round(data.main.temp)}°C (ressenti ${Math.round(data.main.feels_like)}°C)`, inline: true },
          { name: '💧 Humidité', value: `${data.main.humidity}%`, inline: true },
          { name: '💨 Vent', value: `${Math.round(data.wind.speed * 3.6)} km/h`, inline: true },
          { name: '📊 Pression', value: `${data.main.pressure} hPa`, inline: true },
          { name: '👁️ Visibilité', value: `${(data.visibility / 1000).toFixed(1)} km`, inline: true },
          { name: '☁️ Nuages', value: `${data.clouds.all}%`, inline: true },
        )
        .setFooter({ text: 'Source : OpenWeatherMap' })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await interaction.editReply('❌ Erreur lors de la récupération de la météo.');
    }
  },
};
