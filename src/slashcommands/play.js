const { SlashCommandBuilder } = require('discord.js');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
} = require('@discordjs/voice');
const playdl = require('play-dl');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('🎵 Reproduce música desde YouTube')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('Link de YouTube o nombre de la canción')
                .setRequired(true)
        ),

    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({
                content: '❌ Tenés que estar en un canal de voz',
                ephemeral: true,
            });
        }

        await interaction.deferReply();

        try {
            let query = interaction.options.getString('query');
            console.log('🔎 Buscando:', query);

            let video;
            const validation = playdl.yt_validate(query);

            // ───── SI ES LINK DE YOUTUBE ─────
            if (validation === 'video') {
                video = await playdl.video_info(query);
            }

            // ───── SI ES TEXTO ─────
            else {
                const results = await playdl.search(query, {
                    limit: 1,
                    source: { youtube: 'video' },
                });

                if (!results.length) {
                    return interaction.editReply('❌ No se encontró ningún resultado');
                }

                video = await playdl.video_info(results[0].url);
            }

            const stream = await playdl.stream(video.video_details.url);

            // ───── VOICE ─────
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                selfDeaf: true,
            });

            const player = createAudioPlayer();
            const resource = createAudioResource(stream.stream, {
                inputType: stream.type,
            });

            connection.subscribe(player);
            player.play(resource);

            player.on(AudioPlayerStatus.Playing, () => {
                console.log('▶️ Reproduciendo audio');
            });

            await interaction.editReply(
                `🎶 Reproduciendo: **${video.video_details.title}**`
            );
        } catch (err) {
            console.error('❌ ERROR PLAY:', err);
            if (interaction.deferred) {
                await interaction.editReply('❌ Error al reproducir la música');
            }
        }
    },
};