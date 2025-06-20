require('dotenv').config();

module.exports = {
  // Configuración del bot
  token: process.env.TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  prefix: process.env.PREFIX || '!3p',
  
  // Configuración de audio
  audioTimeout: 60000, // 60 segundos
  introAudio: './audio/hola.mp3',
  outroAudio: './assets/hasta la proxima leave.mp3',
  
  // Configuración de actividad
  activity: {
    name: "Dragonbolseta",
    type: "STREAMING",
    url: "https://www.youtube.com/watch?v=koMU9-aDsSs"
  },
  
  // Configuración de embeds
  embedColors: {
    primary: 0x0099ff,
    success: 0x00ff00,
    error: 0xff0000,
    warning: 0xffaa00
  },
  
  // URLs de imágenes
  images: {
    avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_lx9GfKl1WnbnqgCq5Zw9S6AIXRHLZAsL4rPjMoR8Z-Ng=s900-c-k-c0x00ffffff-no-rj',
    welcomeGif: 'https://media1.tenor.com/m/dXI7vq868AQAAAAd/july3p-la-voy-poner-en-la-vida.gif'
  }
}; 