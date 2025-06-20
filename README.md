# 🎵 July3p Discord Bot

Un bot de Discord inspirado en July3p que reproduce clips de audio en canales de voz. ¡Perfecto para agregar diversión a tu servidor!

## ✨ Características

- 🎵 **Reproducción de audio**: Reproduce clips de audio de July3p en canales de voz
- 🎲 **Comando aleatorio**: Reproduce un sonido aleatorio
- 🚪 **Salida automática**: Sale automáticamente del canal después de reproducir
- 📋 **Comandos slash**: Soporte para comandos modernos de Discord
- 🎨 **Embeds personalizados**: Interfaz visual atractiva
- ⚡ **Respuesta rápida**: Manejo eficiente de comandos

## 🎵 Comandos Disponibles

### Comandos de Texto (Prefijo: `!3p`)
- `!3p [comando]` - Reproduce un sonido específico
- `!3p random` - Reproduce un sonido aleatorio
- `!3p leave` - Sale del canal de voz

### Comandos Slash
- `/help` - Muestra la lista de comandos disponibles
- `/ping` - Verifica si el bot está respondiendo

### Sonidos Incluidos
- `a comer` - "A comer"
- `falopa` - "Falopa"
- `frikis` - "Frikis"
- `hasta la proxima` - "Hasta la próxima"
- `hola` - "Hola"
- `lesbiana` - "Lesbiana"
- `oye superman` - "Oye Superman"
- `que estas haciendo` - "¿Qué estás haciendo?"
- `virgen` - "Virgen"

## 🚀 Instalación

### Prerrequisitos
- Node.js 16.9.0 o superior
- npm o yarn
- Una aplicación de Discord con bot token

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/juaniserrano/july3p-discord-bot.git
   cd july3p-discord-bot
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   TOKEN=tu_token_del_bot_aqui
   CLIENT_ID=tu_client_id_aqui
   GUILD_ID=tu_guild_id_aqui
   PREFIX=!3p
   ```

4. **Configura los permisos del bot**
   
   Asegúrate de que tu bot tenga los siguientes permisos:
   - Send Messages
   - Use Slash Commands
   - Connect
   - Speak
   - Use Voice Activity

5. **Ejecuta el bot**
   ```bash
   npm start
   ```

## 📁 Estructura del Proyecto

```
july3p-discord-bot/
├── audio/                 # Archivos de audio (.mp3)
├── assets/               # Recursos adicionales
├── config.js            # Configuración centralizada
├── audioHandler.js      # Manejador de audio
├── embeds.js           # Embeds personalizados
├── help.js             # Comando de ayuda
├── index.js            # Archivo principal
├── package.json        # Dependencias
└── README.md          # Documentación
```

## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `TOKEN` | Token de tu bot de Discord | ✅ |
| `CLIENT_ID` | ID de tu aplicación de Discord | ✅ |
| `GUILD_ID` | ID de tu servidor de Discord | ✅ |
| `PREFIX` | Prefijo para comandos de texto (default: `!3p`) | ❌ |

### Configuración Personalizable

Puedes modificar la configuración en `config.js`:

```javascript
module.exports = {
  audioTimeout: 60000,        // Tiempo antes de salir (ms)
  introAudio: './audio/hola.mp3',  // Audio de introducción
  outroAudio: './assets/hasta la proxima leave.mp3',  // Audio de despedida
  // ... más configuraciones
};
```

## 🎵 Agregar Nuevos Sonidos

Para agregar nuevos sonidos:

1. Coloca el archivo `.mp3` en la carpeta `audio/`
2. El nombre del archivo (sin extensión) será el comando
3. Reinicia el bot

**Ejemplo:**
- Archivo: `audio/nuevo_sonido.mp3`
- Comando: `!3p nuevo_sonido`

## 🛠️ Desarrollo

### Scripts Disponibles

```bash
npm start          # Inicia el bot con nodemon
npm test           # Ejecuta tests (no implementado)
```

### Dependencias Principales

- **discord.js** - Framework de Discord
- **@discordjs/voice** - Funcionalidad de voz
- **libsodium-wrappers** - Encriptación de voz
- **dotenv** - Variables de entorno

## 🐛 Solución de Problemas

### El bot no se conecta
- Verifica que el token sea correcto
- Asegúrate de que el bot tenga los permisos necesarios

### No reproduce audio
- Verifica que estés en un canal de voz
- Asegúrate de que los archivos de audio existan
- Revisa los permisos de voz del bot

### Comandos slash no funcionan
- Verifica que CLIENT_ID y GUILD_ID sean correctos
- Asegúrate de que el bot tenga permisos de comandos slash

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **July3p** - Por la inspiración y el contenido
- **Discord.js** - Por el excelente framework
- **Comunidad de Discord** - Por el soporte y feedback

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de [Solución de Problemas](#-solución-de-problemas)
2. Abre un issue en GitHub
3. Contacta al desarrollador

---

**¡Disfruta usando July3p Bot en tu servidor! 🎵**
