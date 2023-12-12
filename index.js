const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'MTE4MDEwNTU5Nzg3NDYxMDIwNg.GFOIKd.jtZ8q48QEs1obC3NQ3-NsmBUZkIIit-mibjZIs';

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

client.login(token);
