// const { SlashCommandBuilder } = require('@discordjs/builders');

// module.exports = {
//   data: new SlashCommandBuilder().setName('help').setDescription('Obtener ayuda sobre los comandos disponibles.'),
//   async execute(interaction) {
//     await interaction.reply('Pong!');
//   },
// };

const { REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();
const botID = process.env.CLIENT_ID;
const serverID = process.env.GUILD_ID;
const token = process.env.TOKEN;
console.log(botID, serverID, token);

const rest = new REST({ version: '9' }).setToken(token);
const slashRegister = async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(botID, serverID), {
      body: [
        {
          name: 'help',
          description: 'Obtener ayuda sobre los comandos disponibles.',
        },
      ],
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  data: new SlashCommandBuilder().setName('help').setDescription('Obtener ayuda sobre los comandos disponibles.'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
  slashRegister,
};
