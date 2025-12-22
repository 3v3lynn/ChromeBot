const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Comando de ping",

    async execute(client, interaction){
        let ping = Date.now() - interaction.createdTimestamp;

        const embed = new EmbedBuilder()
        .setColor("Black")
        .setDescription(`ping => ${ping}`)

        interaction.reply({ embeds: [embed] })
    }
}