const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const audioDir = path.join(__dirname, 'audio');
const allowedCommands = fs.readdirSync(audioDir).map((file) => file.split('.')[0]);

console.log(allowedCommands);

const exampleEmbed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle('Some title')
  .setURL('https://discord.js.org/')
  .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
  .setDescription('Some description here')
  .setThumbnail('https://i.imgur.com/AfFp7pu.png')
  .addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true }
  )
  .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
  .setImage('https://i.imgur.com/AfFp7pu.png')
  .setTimestamp()
  .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

const embedCommandNotFound = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle('Comando no encontrado')
  .setDescription('El comando que ingresaste no es válido. Por favor, intenta con uno de los siguientes comandos:')
  .addFields({ name: 'Comandos disponibles', value: allowedCommands.join('\n ') })

const embedNotInVoiceChannel = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle('No estás en un canal de voz')
  .setDescription('Por favor, únete a un canal de voz e intenta de nuevo.');

const embedFirstTimeJoin = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle('¡Hola amigos de youtube como andan, soy yo July3p!')
  .setDescription('Gracias tipazo/tipaza por invitarme a tu servidor. Para ver los comandos disponibles usa `/help` en el chat. Te mando un abrazo rompehuesos y galaxia de goku.')
  .setImage('https://media1.tenor.com/m/dXI7vq868AQAAAAd/july3p-la-voy-poner-en-la-vida.gif')
  .setFooter({ text: 'hasta la proximaaaaa! bay', iconURL: 'https://yt3.googleusercontent.com/ytc/AIdro_lx9GfKl1WnbnqgCq5Zw9S6AIXRHLZAsL4rPjMoR8Z-Ng=s900-c-k-c0x00ffffff-no-rj' });

module.exports = { exampleEmbed, embedCommandNotFound, embedNotInVoiceChannel, embedFirstTimeJoin };
