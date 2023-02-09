const { Client, GatewayIntentBits } = require("discord.js");

const { commandsName } = require("./commands");

const {
  handlewelcomeReply,
  handleGetTime,
  handleTagWelcomeMessgae,
  handleTemp,
  handleSpam,
  handle404,
  handleGetDate,
} = require("./controllers/annabelle");

const {
  handleInteractionPING,
  handleInteractionADVICE,
  handleInteractionEVALUATE,
} = require("./controllers/annabelleInteraction");
const {
  canWelcomeText,
  canTimeText,
  canSpamText,
  canDateText,
} = require("./utils/canThisText");

const { getSpamMetaData } = require("./utils/compute");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return false;

  if (
    message.content.includes("@here") ||
    message.content.includes("@everyone") ||
    message.type == "REPLY"
  )
    return false;

  // mentions handle
  if (message.mentions.has(client.user.id)) {
    const params = message.content.split(" ");
    const question = params[1];
    if (canWelcomeText.includes(question)) {
      handleTagWelcomeMessgae(message);
    } else if (canTimeText.includes(question)) {
      handleGetTime(message);
    } else if (canDateText.includes(question)) {
      handleGetDate(message);
    } else if (canSpamText.includes(question)) {
      const [text, times] = getSpamMetaData(params, message);
      if (times > 100) return handleSpam(false, message);
      for (let i = 0; i < times; ++i) {
        handleSpam(true, message, text);
      }
    } else if (question === "cat") {
      handleTemp(message);
    } else {
      handle404(message);
    }
  }

  // global handle
  if (canWelcomeText.includes(message.content)) {
    handlewelcomeReply(message);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName === commandsName.PING) {
    await handleInteractionPING(interaction);
  } else if (commandName === commandsName.ADVICE) {
    await handleInteractionADVICE(interaction);
  } else if (commandName === commandsName.EVALUATE) {
    const expression = interaction.options.data[0].value;
    await handleInteractionEVALUATE(interaction, expression);
  }
});

client.login(process.env.TOKEN);
