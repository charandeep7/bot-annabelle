const { REST, Routes } = require("discord.js");
const { pingcmd, advicecmd, evaluatecmd , commandsName } = require('./commands/commandList')
require("dotenv").config();

const commands = [
  pingcmd.toJSON(),
  advicecmd.toJSON(),
  evaluatecmd.toJSON(),
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();


module.exports = {
  commandsName,
};
