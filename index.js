const Discord = require('discord.js');
const { Intents } = require('discord.js');
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.MESSAGE_CONTENT,
    Intents.FLAGS.MESSAGE_REACTIONS,
    Intents.FLAGS.MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});
const { handleMoneyCommands } = require('./money');

const prefix = '$';
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
