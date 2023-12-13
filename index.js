const Discord = require('discord.js');
const client = new Discord.Client();

const token = process.env.DISCORD_BOT_TOKEN;

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore messages from other bots

  if (message.content.toLowerCase() === 'hi') {
    message.reply('Hello!');
  } else if (message.content.toLowerCase() === 'ping') {
    message.channel.send('Pong!');
  }
});

client.login(token);
