const { Client, ActivityType } = require('discord.js');
const { embedCommandNotFound, embedFirstTimeJoin } = require('./embeds');
const helpCommand = require('./help');
const AudioHandler = require('./audioHandler');
const config = require('./config');

// Inicializar el cliente de Discord
const client = new Client({ intents: 3276799 });

// Inicializar el manejador de audio
const audioHandler = new AudioHandler();

// Evento cuando el bot está listo
client.once('ready', () => {
  console.log(`✅ Conectado como ${client.user.tag} a las ${new Date()}`);
  
  // Registrar comandos slash
  helpCommand.registerSlashCommands();
  
  // Configurar actividad del bot
  client.user.setActivity({
    name: config.activity.name,
    type: ActivityType[config.activity.type],
    url: config.activity.url
  });
});

// Evento cuando el bot se une a un servidor
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

// Manejar comandos slash
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  try {
    switch (commandName) {
      case 'ping':
        await interaction.reply('🏓 Pong!');
        break;
        
      case 'help':
        await helpCommand.execute(interaction);
        break;
        
      default:
        await interaction.reply({
          content: '❌ Comando no reconocido',
          ephemeral: true
        });
    }
  } catch (error) {
    console.error('Error al ejecutar comando slash:', error);
    await interaction.reply({
      content: '❌ Hubo un error al ejecutar el comando',
      ephemeral: true
    });
  }
});

// Manejar comandos de texto
client.on('messageCreate', async message => {
  // Ignorar mensajes de bots y mensajes que no empiecen con el prefijo
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  // Extraer el comando del mensaje
  const command = message.content.slice(config.prefix.length).trim().toLowerCase();

  // Verificar si el comando es válido
  if (!audioHandler.isValidCommand(command)) {
    message.channel.send({ embeds: [embedCommandNotFound] });
    return;
  }

  try {
    let result;

    // Manejar comando leave
    if (command === 'leave') {
      result = await audioHandler.leaveVoiceChannel(message);
    } else {
      // Manejar comandos de audio
      result = await audioHandler.playAudio(message, command);
    }

    // Responder al usuario solo si hay error
    if (!result.success) {
      message.reply(`❌ ${result.message}`);
    }
    // Si es exitoso (audio o leave), no enviar mensaje

  } catch (error) {
    console.error('Error al procesar comando:', error);
    message.reply('❌ Hubo un error al procesar el comando. Inténtalo de nuevo.');
  }
});

// Manejar errores no capturados
process.on('unhandledRejection', error => {
  console.error('Error no manejado:', error);
});

process.on('uncaughtException', error => {
  console.error('Excepción no capturada:', error);
  process.exit(1);
});

// Iniciar sesión del bot
client.login(config.token);
