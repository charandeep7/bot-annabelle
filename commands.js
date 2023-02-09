const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const evaluatecmd = new SlashCommandBuilder()
  .setName("evaluate")
  .setDescription("Evaluate mathematical expression")
  .addStringOption((option) =>
    option
      .setName("expression")
      .setDescription("A mathematical expression")
      .setRequired(true)
  );

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "advice",
    description: "Replies with a random advice",
  },
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

const commandsName = {
  PING: "ping",
  ADVICE: "advice",
  EVALUATE: "evaluate",
};

module.exports = {
  commandsName,
};
