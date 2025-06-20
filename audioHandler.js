const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const fs = require('fs');
const path = require('path');
const config = require('./config');

class AudioHandler {
  constructor() {
    this.audioDir = path.join(__dirname, 'audio');
    this.allowedCommands = this.loadAudioCommands();
  }

  // Cargar comandos de audio disponibles
  loadAudioCommands() {
    try {
      return fs.readdirSync(this.audioDir)
        .filter(file => file.endsWith('.mp3'))
        .map(file => file.split('.')[0])
        .sort();
    } catch (error) {
      console.error('Error al cargar comandos de audio:', error);
      return [];
    }
  }

  // Reproducir audio en un canal de voz
  async playAudio(message, command) {
    const member = message.member;
    
    // Verificar si el usuario está en un canal de voz
    if (!member.voice.channel) {
      return {
        success: false,
        message: `${member.globalName || member.user.username} sos un tipazo/tipaza, pero tenes que estar en un canal de voz para que pueda entrar.`
      };
    }

    try {
      const channel = member.voice.channel;
      const player = createAudioPlayer();
      
      // Unirse al canal de voz
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      connection.subscribe(player);

      // Determinar qué audio reproducir
      let audioFile;
      if (command === 'random') {
        const randomIndex = Math.floor(Math.random() * this.allowedCommands.length);
        audioFile = path.join(this.audioDir, `${this.allowedCommands[randomIndex]}.mp3`);
      } else {
        audioFile = path.join(this.audioDir, `${command}.mp3`);
      }

      // Verificar que el archivo existe
      if (!fs.existsSync(audioFile)) {
        connection.destroy();
        return {
          success: false,
          message: `No encontré el archivo de audio para "${command}"`
        };
      }

      // Reproducir intro
      const introResource = createAudioResource(config.introAudio);
      player.play(introResource);

      let hasPlayedMain = false;

      // Manejar eventos del reproductor
      player.on(AudioPlayerStatus.Playing, () => {
        if (!hasPlayedMain) {
          const mainResource = createAudioResource(audioFile);
          player.play(mainResource);
          hasPlayedMain = true;
        }
      });

      // Configurar salida automática
      setTimeout(() => {
        if (fs.existsSync(config.outroAudio)) {
          const outroResource = createAudioResource(config.outroAudio);
          player.play(outroResource);
        }
        
        player.on(AudioPlayerStatus.Idle, () => {
          connection.destroy();
        });
      }, config.audioTimeout);

      // No devolver mensaje de confirmación, solo reproducir silenciosamente
      return {
        success: true,
        message: null
      };

    } catch (error) {
      console.error('Error al reproducir audio:', error);
      return {
        success: false,
        message: 'Hubo un error al reproducir el audio. Inténtalo de nuevo.'
      };
    }
  }

  // Salir del canal de voz
  async leaveVoiceChannel(message) {
    const member = message.member;
    
    if (!member.voice.channel) {
      return {
        success: false,
        message: 'Tipazo/a no puedo salir de un canal de voz si no estoy en uno'
      };
    }

    try {
      const channel = member.voice.channel;
      
      // Buscar si ya hay una conexión activa en el servidor
      const guild = message.guild;
      const existingConnection = guild.members.me?.voice?.connection;
      
      if (existingConnection) {
        // Si hay una conexión existente, reproducir audio de despedida y luego salir
        const player = createAudioPlayer();
        existingConnection.subscribe(player);
        
        // Reproducir audio de despedida
        const outroResource = createAudioResource(config.outroAudio);
        player.play(outroResource);
        
        // Salir cuando termine el audio
        player.on(AudioPlayerStatus.Idle, () => {
          existingConnection.destroy();
        });
        
        return {
          success: true,
          message: null // No enviar mensaje, solo reproducir audio
        };
      } else {
        // Si no hay conexión existente, crear una temporal para reproducir despedida
        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
        
        const player = createAudioPlayer();
        connection.subscribe(player);
        
        // Reproducir audio de despedida
        const outroResource = createAudioResource(config.outroAudio);
        player.play(outroResource);
        
        // Salir cuando termine el audio
        player.on(AudioPlayerStatus.Idle, () => {
          connection.destroy();
        });
        
        return {
          success: true,
          message: null // No enviar mensaje, solo reproducir audio
        };
      }
    } catch (error) {
      console.error('Error al salir del canal de voz:', error);
      return {
        success: false,
        message: 'Hubo un error al salir del canal de voz.'
      };
    }
  }

  // Verificar si un comando es válido
  isValidCommand(command) {
    return this.allowedCommands.includes(command) || command === 'random' || command === 'leave';
  }

  // Obtener lista de comandos disponibles
  getAvailableCommands() {
    return this.allowedCommands;
  }
}

module.exports = AudioHandler; 