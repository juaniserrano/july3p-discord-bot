const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('help').setDescription('Obtener ayuda sobre los comandos disponibles.'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
