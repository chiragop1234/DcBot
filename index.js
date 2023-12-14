const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
  if (message.content.toLowerCase() === 'hi') {
    message.reply('Hello!');
  }
});

client.login(process.env.TOKEN);
