const prefix = '$';
const currencyName = 'bytes';

const rewardsCooldown = new Set();
const jobs = ['Developer', 'Artist', 'Musician', 'Writer', 'Gamer'];

const users = {};

function handleMoneyCommands(message, args) {
  if (args.length === 0) return;

  const command = args.shift().toLowerCase();

  if (command === 'help') {
    handleHelpCommand(message);
  } else if (command === 'daily') {
    handleDailyCommand(message);
  } else if (command === 'gamble') {
    handleGambleCommand(message, args);
  } else if (command === 'earn') {
    handleEarnCommand(message);
  } else if (command === 'job') {
    handleJobCommand(message, args);
  } else if (command === 'balance') {
    handleBalanceCommand(message);
  }
}

function handleHelpCommand(message) {
  message.channel.send(`
    **Commands:**
    - ${prefix}daily: Claim daily rewards
    - ${prefix}gamble <amount>: Gamble your bytes
    - ${prefix}earn: Earn bytes by working
    - ${prefix}job: View available jobs
    - ${prefix}job <job>: Choose a job
    - ${prefix}balance: Check your balance
  `);
}

function handleDailyCommand(message) {
  if (rewardsCooldown.has(message.author.id)) {
    message.reply('You can only claim daily rewards once a day.');
  } else {
    const rewardAmount = Math.floor(Math.random() * 100) + 1; // Random reward amount
    users[message.author.id] = (users[message.author.id] || { balance: 0 });
    users[message.author.id].balance += rewardAmount;
    message.reply(`You claimed ${rewardAmount} ${currencyName} as daily rewards.`);
    rewardsCooldown.add(message.author.id);
    setTimeout(() => {
      rewardsCooldown.delete(message.author.id);
    }, 86400000); // 24 hours cooldown
  }
}

function handleGambleCommand(message, args) {
  const amount = parseInt(args[0]);
  if (isNaN(amount) || amount <= 0) {
    message.reply('Please enter a valid amount to gamble.');
  } else if (users[message.author.id]?.balance < amount) {
    message.reply('You don\'t have enough bytes to gamble that amount.');
  } else {
    const gambleResult = Math.random() < 0.5; // 50% chance to win
    if (gambleResult) {
      users[message.author.id].balance += amount;
      message.reply(`You won ${amount} ${currencyName} in the gamble!`);
    } else {
      users[message.author.id].balance -= amount;
      message.reply(`You lost ${amount} ${currencyName} in the gamble.`);
    }
  }
}

function handleEarnCommand(message) {
  const earnedAmount = Math.floor(Math.random() * 50) + 1; // Random earning amount
  users[message.author.id] = (users[message.author.id] || { balance: 0 });
  users[message.author.id].balance += earnedAmount;
  message.reply(`You earned ${earnedAmount} ${currencyName} by working.`);
}

function handleJobCommand(message, args) {
  const userJob = users[message.author.id]?.job;

  if (args.length === 0) {
    message.reply(`Your current job is: ${userJob || 'Unemployed'}`);
    message.reply(`Available jobs: ${jobs.join(', ')}`);
  } else {
    const selectedJob = args[0].toLowerCase();
    if (!jobs.includes(selectedJob)) {
      message.reply('Invalid job. Please choose a valid job.');
    } else {
      users[message.author.id] = users[message.author.id] || {};
      users[message.author.id].job = selectedJob;
      message.reply(`You are now a ${selectedJob}.`);
    }
  }
}

function handleBalanceCommand(message) {
  const userBalance = users[message.author.id]?.balance || 0;
  message.reply(`Your current balance: ${userBalance} ${currencyName}`);
}

module.exports = {
  handleMoneyCommands,
};
