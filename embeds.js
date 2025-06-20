const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const audioDir = path.join(__dirname, 'audio');
const allowedCommands = fs.readdirSync(audioDir).map((file) => file.split('.')[0]).sort();

console.log('🎵 Comandos de audio disponibles:', allowedCommands);

// Embed para comando no encontrado
const embedCommandNotFound = new EmbedBuilder()
  .setColor(config.embedColors.primary)
  .setTitle('❌ No se decir esa palabra tipas tipos')
  .setDescription('Te dejo una lista de los comandos que puedo hacer porque sos un tipazo/tipaza')
  .addFields({ 
    name: '🎵 Comandos disponibles', 
    value: allowedCommands.map(cmd => `\`${cmd}\``).join(', ') || 'No hay comandos disponibles'
  })
  .addFields(
    { 
      name: '🎲 Comando aleatorio', 
      value: '`!3p random` - Reproduce un sonido aleatorio',
      inline: true 
    },
    { 
      name: '🚪 Salir del canal', 
      value: '`!3p leave` - Sale del canal de voz',
      inline: true 
    }
  )
  .setFooter({ 
    text: 'Si no sabes cual usar, proba con !3p random', 
    iconURL: config.images.avatar 
  });

// Embed para usuario no en canal de voz
const embedNotInVoiceChannel = new EmbedBuilder()
  .setColor(config.embedColors.warning)
  .setTitle('🎤 No estás en un canal de voz')
  .setDescription('Por favor, únete a un canal de voz e intenta de nuevo.')
  .setFooter({ 
    text: 'July3p Bot', 
    iconURL: config.images.avatar 
  });

// Embed de bienvenida al servidor
const embedFirstTimeJoin = new EmbedBuilder()
  .setColor(config.embedColors.primary)
  .setTitle('🎉 ¡Hola amigos de youtube como andan, soy yo July3p!')
  .setDescription('Gracias tipazo/tipaza por invitarme a tu servidor. Para ver los comandos disponibles usa `/help` en el chat. Te mando un abrazo rompehuesos y galaxia de goku.')
  .setImage(config.images.welcomeGif)
  .addFields({
    name: '🎵 ¿Cómo usar el bot?',
    value: 'Escribe `!3p` seguido del nombre del comando para reproducir audio en tu canal de voz.',
    inline: false
  })
  .setFooter({ 
    text: 'hasta la proximaaaaa', 
    iconURL: config.images.avatar 
  });

// Embed de ayuda mejorado
const embedHelp = new EmbedBuilder()
  .setColor(config.embedColors.primary)
  .setTitle('🎵 July3p Bot - Comandos Disponibles')
  .setDescription('Aquí tienes todos los comandos que puedo hacer:')
  .addFields(
    {
      name: '🎵 Comandos de Audio',
      value: allowedCommands.map(cmd => `\`${cmd}\``).join(', ') || 'No hay comandos disponibles',
      inline: false
    },
    {
      name: '🎲 Comando Aleatorio',
      value: '`!3p random` - Reproduce un sonido aleatorio',
      inline: true
    },
    {
      name: '🚪 Salir del Canal',
      value: '`!3p leave` - Sale del canal de voz',
      inline: true
    },
    {
      name: '❓ Ayuda',
      value: '`/help` - Muestra esta lista de comandos',
      inline: true
    }
  )
  .setFooter({ 
    text: 'Usa !3p seguido del nombre del comando para reproducir audio', 
    iconURL: config.images.avatar 
  });

module.exports = { 
  embedCommandNotFound, 
  embedNotInVoiceChannel, 
  embedFirstTimeJoin,
  embedHelp,
  allowedCommands
};
