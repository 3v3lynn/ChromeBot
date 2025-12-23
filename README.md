# Chrome Music Discord Bot (UNDER DEVELOPMENT)

Un bot de música para Discord que reproduce canciones de YouTube usando comandos slash.

---

## Requisitos

Antes de ejecutar el bot, necesitás tener instalado:

1. **Node.js** (v22+ recomendado)  
   - Incluye `npm`.
2. **FFmpeg**  
   - Necesario para reproducir audio en Discord.
   - Debe estar en el **PATH** o configurar la ruta manualmente en `.env`.
   - [Descargar FFmpeg](https://ffmpeg.org/download.html)
3. **yt-dlp** (opcional, usado por Distube con YtDlpPlugin)
   - Debe estar en PATH o configurada la ruta en `.env`.
   - [Descargar yt-dlp](https://github.com/yt-dlp/yt-dlp#installation)
4. **Conexión a Internet**  
   - Necesaria para conectarse a Discord y reproducir streams de YouTube.

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/chrome-music-bot.git
cd chrome-music-bot
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo .env en la raíz con tu token de Discord y rutas opcionales:

```ini
TOKEN=TU_TOKEN_DE_DISCORD
YTDLP_PATH=C:\yt-dlp\yt-dlp.exe      # opcional
FFMPEG_PATH=C:\ffmpeg\bin\ffmpeg.exe # opcional
```

##Comandos Slash

/play <query>: Reproduce música desde YouTube (URL o búsqueda).

/stop: Detiene la reproducción.

/skip: Salta la canción actual.

El bot debe estar en un canal de voz para reproducir música.

## Ejecutar el bot

```bash
node .
```

Si todo está bien configurado, verás algo como:

```csharp
🎵 Bot conectado como Chrome Music#6168
```

Notas importantes

* Evitar enlaces de music.youtube.com, solo funcionan URLs de YouTube estándar.
* Asegurarse que FFmpeg esté en el PATH, de lo contrario el bot no reproducirá audio.
* Node.js 22+ es obligatorio para las versiones actuales de distube y discord.js.

Contribuciones

Si encontrás bugs o querés sugerir mejoras, abrí un issue o hacé un pull request.
