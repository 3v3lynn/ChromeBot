const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Detiene la música'),

    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guildId);

        if (!queue) {
            return interaction.reply({
                content: '❌ No hay música reproduciéndose',
                ephemeral: true
            });
        }

        queue.stop();
        await interaction.reply('⏹ Música detenida');
    }
};
