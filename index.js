const Discord = require('discord.js');
const client = new Discord.Client();

// Retrieve the bot token from the environment variable
const token = process.env.BOT_TOKEN;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

// Add more event handlers and commands as needed

// Login to Discord with the bot token
client.login(token);
