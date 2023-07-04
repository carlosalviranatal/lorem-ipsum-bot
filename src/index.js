require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.GuildInvites,
  ],
})

client.on('ready', async (c) => {
  console.log(`${c.user.tag} is online`)
})

// EVERY X BOT
client.on('ready', async () => {

  const targetUserId = '218115318927589397'; // Replace with the actual user ID
  const messageContent = 'Enter your text here'; // Replace with your desired message

  const sendDirectMessage = async () => {
    try {
      const user = await client.users.fetch(targetUserId);
      user.send(messageContent)
        .then(() => console.log('Direct message sent!'))
        .catch((error) => console.error('Error sending direct message:', error));
    } catch (error) {
      console.error('User not found or error fetching user:', error);
    }
  };

  // Send the initial direct message
  sendDirectMessage();

  // Schedule sending direct messages every hour (in milliseconds) , Change time as needed
  setInterval(sendDirectMessage, 60 * 60 * 1000);

});

client.login(process.env.TOKEN)
