const { REST, Routes } = require('discord.js');

const TOKEN = 'MTA3Mjg3NDAzOTE0NTY2MDQ0Nw.GuY67V.yQkJCZjGQatX7ESA5_L1QtR5EjCMTlwrqx088s'
const CLIENT_ID = '1072874039145660447'

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();