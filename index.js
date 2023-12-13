const Discord = require('discord.js');
const client = new Discord.Client();

// Retrieve the bot token from the environment variable
const token = process.env.DISCORD_BOT_TOKEN;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (message) => {
  if (message.author.bot) return; // Ignore messages from other bots

  if (message.content.toLowerCase() === 'hi') {
    message.reply('Hello!');
  } else if (message.content.toLowerCase() === 'ping') {
    message.channel.send('Pong!');
  }
});

// Log in with the retrieved token
client.login(token);
