require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');

for (const folder of fs.readdirSync(foldersPath)) {
  const commandsPath = path.join(foldersPath, folder);
  for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))) {
    const command = require(path.join(commandsPath, file));
    if ('data' in command) commands.push(command.data.toJSON());
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`📡 Déploiement de ${commands.length} commandes slash...`);
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('✅ Commandes déployées avec succès !');
  } catch (error) {
    console.error(error);
  }
})();
