require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const slashHandler = require('./src/handlers/slashHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Slash commands
client.slashCommands = new Map();
slashHandler.loadSlash(client);

client.on('clientReady', () => {
    console.log(`🎵 Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (err) {
        console.error(err);
        if (!interaction.replied) {
            await interaction.reply({ content: '❌ Error ejecutando el comando', ephemeral: true });
        }
    }
});

client.login(process.env.TOKEN);
