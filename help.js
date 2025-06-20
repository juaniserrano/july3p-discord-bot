// const { SlashCommandBuilder } = require('@discordjs/builders');

// module.exports = {
//   data: new SlashCommandBuilder().setName('help').setDescription('Obtener ayuda sobre los comandos disponibles.'),
//   async execute(interaction) {
//     await interaction.reply('Pong!');
//   },
// };

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Obtener la lista de comandos de audio disponibles
const audioDir = path.join(__dirname, 'audio');
const allowedCommands = fs.readdirSync(audioDir).map((file) => file.split('.')[0]).sort();

// Definición del comando help
const helpCommand = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Obtener ayuda sobre los comandos disponibles.'),
  
  async execute(interaction) {
    const commandList = allowedCommands.map(cmd => `\`${cmd}\``).join(', ');
    const embed = {
      color: 0x0099ff,
      title: '🎵 Comandos de July3p Bot',
      description: 'Aquí tienes todos los comandos de audio disponibles:',
      fields: [
        {
          name: '📋 Comandos de Audio',
          value: commandList || 'No hay comandos disponibles',
          inline: false
        },
        {
          name: '🎲 Comando Aleatorio',
          value: '`!3p random` - Reproduce un sonido aleatorio',
          inline: false
        },
        {
          name: '🚪 Salir del Canal',
          value: '`!3p leave` - Sale del canal de voz',
          inline: false
        }
      ],
      footer: {
        text: 'Usa !3p seguido del nombre del comando para reproducir audio',
        icon_url: 'https://yt3.googleusercontent.com/ytc/AIdro_lx9GfKl1WnbnqgCq5Zw9S6AIXRHLZAsL4rPjMoR8Z-Ng=s900-c-k-c0x00ffffff-no-rj'
      }
    };
    
    await interaction.reply({ embeds: [embed] });
  }
};

// Función para registrar comandos slash
const registerSlashCommands = async () => {
  const botID = process.env.CLIENT_ID;
  const serverID = process.env.GUILD_ID;
  const token = process.env.TOKEN;
  
  if (!botID || !serverID || !token) {
    console.error('Faltan variables de entorno: CLIENT_ID, GUILD_ID, o TOKEN');
    return;
  }

  const rest = new REST({ version: '9' }).setToken(token);
  
  try {
    console.log('🔄 Registrando comandos slash...');

    const commands = [
      helpCommand.data.toJSON(),
      {
        name: 'ping',
        description: 'Verificar si el bot está respondiendo',
      }
    ];

    await rest.put(Routes.applicationGuildCommands(botID, serverID), {
      body: commands,
    });

    console.log('✅ Comandos slash registrados exitosamente');
  } catch (error) {
    console.error('❌ Error al registrar comandos slash:', error);
  }
};

module.exports = {
  ...helpCommand,
  registerSlashCommands,
  allowedCommands
};
