const Discord = require('discord.js');
const client = new Discord.Client();
const { handleMoneyCommands } = require('./money');

const token = process.env.DISCORD_BOT_TOKEN;

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  setBotPresence();
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'hi') {
    message.reply('Hello!');
  } else if (command === 'ping') {
    message.channel.send('Pong!');
  } else {
    handleMoneyCommands(message, args);
  }
});

client.login(token);

function setBotPresence() {
  client.user.setPresence({
    activities: [
      {
        name: 'Managing Bytes 💸',
        type: 'PLAYING',
      },
    ],
    status: 'online',
  });
}
