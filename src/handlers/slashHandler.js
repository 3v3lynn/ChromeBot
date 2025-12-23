const fs = require('fs');
const path = require('path');

module.exports = {
    loadSlash(client) {
        const commandsPath = path.join(__dirname, '../slashcommands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, file));
            client.slashCommands.set(command.data.name, command);
        }

        console.log(`Cargados ${client.slashCommands.size} comandos slash.`);
    }
};
