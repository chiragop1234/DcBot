const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '$';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  // Ignore messages from the bot itself
  if (message.author.bot) return;

  // Check if the message starts with the specified prefix
  if (message.content.startsWith(prefix)) {
    // Split the message into command and arguments
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    // Handle different commands
    if (command === 'help') {
      // Respond with a simple help message
      message.reply('This is a simple bot. You can use `$help` for help.');
    } else {
      // Handle unknown command
      message.reply('Unknown command. Use `$help` for help.');
    }
  }
});

// Log in to Discord with the bot token from the environment variable
client.login(process.env.BOT_TOKEN);
