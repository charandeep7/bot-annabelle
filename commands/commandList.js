const { SlashCommandBuilder } = require("discord.js");


const pingcmd = new SlashCommandBuilder()
.setName("ping")
.setDescription("Replies with Pong!")

const advicecmd = new SlashCommandBuilder()
.setName("advice")
.setDescription("Replies with a random advice")

const evaluatecmd = new SlashCommandBuilder()
  .setName("evaluate")
  .setDescription("Evaluate mathematical expression")
  .addStringOption((option) =>
    option
      .setName("expression")
      .setDescription("A mathematical expression")
      .setRequired(true)
);


const commandsName = {
    PING: "ping",
    ADVICE: "advice",
    EVALUATE: "evaluate",
  };

  
module.exports = {
    evaluatecmd,
    pingcmd,
    advicecmd,
    commandsName
}

