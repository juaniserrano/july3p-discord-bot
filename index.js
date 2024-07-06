const { Client, ActivityType } = require('discord.js');
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


client.once('ready', () => {
  console.log(`Conectado como ${client.user.tag} a las ${new Date()}`);

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

client.on('interactionCreate', interaction => {
  if (!interaction.isCommand()) return;
  console.log(interaction);

  if (interaction.commandName === 'help') {
    helpCommand.reply('papu', interaction);
  }
});

client.on('messageCreate', async message => {
  if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return;

  const command = message.content.slice(process.env.PREFIX.length).trim().toLowerCase(); // Extrae el comando de los mensajes
  const audioFilePath = `${__dirname}/audio/${command}.mp3`;
  const allowedCommands = fs.readdirSync(path.join(__dirname, 'audio')).map(file => file.split('.')[0]);
  console.log(allowedCommands);
  console.log(audioFilePath);
  if (message.content === `${process.env.PREFIX} ${command}` && allowedCommands.includes(command)) {
    if (message.member.voice.channel) {
      const channel = message.member.voice.channel;
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();
      const resource = createAudioResource('./audio/hola.mp3');
      player.play(resource);

      connection.subscribe(player);

      let hasPlayed = false; // Variable para rastrear si ya se ha reproducido el audio

      player.on(AudioPlayerStatus.Idle, () => {
        if (!hasPlayed) {
          // Solo reproduce el audio si no se ha reproducido antes
          const preDisconnectResource = createAudioResource(audioFilePath);
          player.play(preDisconnectResource);
          hasPlayed = true; // Marca el audio como reproducido
        }
      });

      setTimeout(() => {
        const preDisconnectResource = createAudioResource(`${__dirname}/audio/hasta la proxima.mp3`);
        player.play(preDisconnectResource);
        player.on(AudioPlayerStatus.Idle, () => {
          connection.destroy(); // Desconecta después de reproducir el último audio
        });
      }, 60000); // 60 seconds in milliseconds
    } else {
      //Un mensaje que responda, tipazo "nombre"
      message.reply(`${message.author.globalName} sos un tipazo/tipaza, pero tenes que estar en un canal de voz para que pueda entrar.`); // Responde si el usuario no está en un canal de voz
    }
  } else {
    message.channel.send({ embeds: [embedCommandNotFound] });
  }
});


client.login(process.env.TOKEN);
