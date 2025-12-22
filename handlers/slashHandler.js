const { readdirSync } = require("node:fs");
const { compileFunction } = require("node:vm");

module.exports = {

    async loadSlash(client){
        for(const category of readdirSync("./slashcommands")){
            for(const otherCategory of readdirSync(`./slashcommands/${category}`)){
                for(const fileName of readdirSync(`./slashcommands/${category}/${otherCategory}`).filter((file) => file.endsWith(".js"))){

                    const command = require(`../slashcommands/${category}/${otherCategory}/${fileName}`);
                    client.slashCommands.set(command.name, command);
                }
            }
        }
    }
}