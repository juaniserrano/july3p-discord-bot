const { Client, ActivityType, SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { embedCommandNotFound, embedFirstTimeJoin } = require('./embeds');
const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const helpCommand = require('./help');
require('dotenv').config();

const client = new Client({ intents: 3276799 });

const commands = [helpCommand];

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
//Agregar el comando random
const allowedCommands = fs.readdirSync(path.join(__dirname, 'audio')).map(file => file.split('.')[0]);

const pingCommand = new SlashCommandBuilder().setName('ping').setDescription('Check if this interaction is responsive');

client.once('ready', () => {
  console.log(`Conectado como ${client.user.tag} a las ${new Date()}`);
  helpCommand.slashRegister();
  client.user.setActivity({
    name: "Dragonbolseta",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=koMU9-aDsSs"
  });
});


client.on('guildCreate', guild => {
  let channel = guild.systemChannel;
  if (!channel) {
    channel = guild.channels.cache
      .filter(c => c.type === 'GUILD_TEXT' && c.permissionsFor(guild.me).has('SEND_MESSAGES'))
      .sort((a, b) => a.position - b.position)
      .first();
  }
  if (channel) {
    channel.send({ embeds: [embedFirstTimeJoin] });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (interaction.isCommand()){
    if (commandName === 'ping') {
      await interaction.reply('Pong!');
    } else if (commandName === 'help') {
      await interaction.reply('Pongss!');
    }
  }
});

client.on('messageCreate', async message => {
  if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return;

  let command = message.content.slice(process.env.PREFIX.length).trim().toLowerCase(); // Extrae el comando de los mensajes

  if (message.content === `${process.env.PREFIX} ${command}` && allowedCommands.includes(command) || command === 'random' || command === 'leave') {
    if (command === 'leave') {
      if (message.member.voice.channel) {
        const channel = message.member.voice.channel;
        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
        connection.destroy();
      } else {
        message.reply('Tipazo/a no puedo salir de un canal de voz si no estoy en uno');
      }
      return;
    }
    if (message.member.voice.channel) {
      if (command === 'random') {
        const randomIndex = Math.floor(Math.random() * allowedCommands.length);
        command = allowedCommands[randomIndex];
      }
      const audioFilePath = `${__dirname}/audio/${command}.mp3`;
      const channel = message.member.voice.channel;
      const player = createAudioPlayer();
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      connection.subscribe(player);
      const playAudio = (resourcePath) => {
        const resource = createAudioResource(resourcePath);
        player.play(resource);
      };

      playAudio('./audio/hola.mp3');

      let hasPlayed = false;

      player.on(AudioPlayerStatus.Playing, () => {
        if (!hasPlayed) {
          playAudio(audioFilePath);
          hasPlayed = true;
        }
      });

      setTimeout(() => {
        playAudio(`${__dirname}/assets/hasta la proxima leave.mp3`);
        player.on(AudioPlayerStatus.Idle, () => {
          connection.destroy();
        });
      }, 60000);
    } else {
      //Un mensaje que responda, tipazo "nombre"
      message.reply(`${message.author.globalName} sos un tipazo/tipaza, pero tenes que estar en un canal de voz para que pueda entrar.`); // Responde si el usuario no está en un canal de voz
    }
  } else {
    message.channel.send({ embeds: [embedCommandNotFound] });
  }
});


client.login(process.env.TOKEN);
