const { Client, GatewayIntentBits } = require("discord.js");

const cron = require("node-cron");

const { year } = require("./utils/getYear");

const { birthdays } = require("./utils/birthday");

const { commandsName } = require("./commands/commandList");

const {
  handlewelcomeReply,
  handleGetTime,
  handleTagWelcomeMessgae,
  handleTemp,
  handleSpam,
  handleBye,
  handleGoodMorning,
  handleGoodAfterNoon,
  handleGoodEvening,
  handleGoodNight,
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
  canByeText,
  canGoodMorningText,
  canAfterNoonText,
  canEveningText,
  canNightText,
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

  if (message.content.includes("@here") || message.type == "REPLY")
    return false;

  // mentions handle
  if (message.mentions.has(client.user.id)) {
    const params = message.content.split(" ");
    const question = params[1];
    const question2 = params.slice(1, 3).join(" ");
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
    } else if (canByeText.includes(question)) {
      handleBye(message);
    } else if (canGoodMorningText.includes(question2)) {
      handleGoodMorning(message);
    } else if (canAfterNoonText.includes(question2)) {
      handleGoodAfterNoon(message);
    } else if (canEveningText.includes(question2)) {
      handleGoodEvening(message);
    } else if (canNightText.includes(question2)) {
      handleGoodNight(message);
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

const setSchedules = () => {
  const general = client.channels.cache.get(process.env.SERVER_401_GENERAL_CHANNEL_ID);
  birthdays.forEach((birthday, userId) => {
    if (birthday.status !== year) {
      birthdays.set(userId,{...birthday, status: year})
      const user = client.users.cache.get(userId);
      cron.schedule(`* * ${birthday.day} ${birthday.month} *`, () => {
          general.send(`Today's ${user.toString()} birthday, congratulations!`);
      });
    }else{
      return
    }
  });
};

client.on("ready", setSchedules);

client.login(process.env.TOKEN);
