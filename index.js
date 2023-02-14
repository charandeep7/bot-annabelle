require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const { OpenAIApi, Configuration } = require("openai");

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

const config = new Configuration({
  apiKey: process.env.OPEN_AI,
});

const openai = new OpenAIApi(config);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const PAST_MESSAGE = 5;

client.on("messageCreate", async (message) => {
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
      // GPT3 handle
      if (message.channel.id === process.env.ANNABELLE_CHANNEL || message.channel.id === process.e.ANNABELLE_CHANNEL_2) {
        message.channel.sendTyping();
        try {
          let messages = Array.from(
            await message.channel.messages.fetch({
              limit: PAST_MESSAGE,
              before: message.id,
            })
          );

          messages = messages.map((message) => message[1]);
          messages.unshift(message);

          let users = [
            ...new Set([
              ...messages.map((message) => message.member.displayName),
              client.user.username,
            ]),
          ];

          let lastUser = users.pop();

          let prompt = `The following is a conversation between ${users.join(
            ", "
          )}, and ${lastUser}. \n\n`;

          for (let i = messages.length - 1; i >= 0; --i) {
            const m = messages[i];
            prompt += `${m.member.displayName} ${m.content}\n`;
          }

          prompt += `${client.user.username}`;

          const response = await openai.createCompletion({
            prompt,
            model: "text-davinci-003",
            max_tokens: 1000,
            stop: ["${client.user.username}","${m.member.displayName}"],
          });
          const reply = response.data.choices[0].text;
          console.log(response.data)
          await message.channel.send(`\`\`\`${reply}\`\`\``);
        } catch (e) {
          handle404(message);
        }
      } else {
        handle404(message);
      }
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
  const general = client.channels.cache.get(
    process.env.SERVER_401_GENERAL_CHANNEL_ID
  );
  birthdays.forEach((birthday, userId) => {
    if (birthday.status !== year) {
      birthdays.set(userId, { ...birthday, status: year });
      const user = client.users.cache.get(userId);
      cron.schedule(`0 0 ${birthday.day} ${birthday.month} *`, () => {
        general.send(`Today's ${user.toString()} birthday, congratulations!`);
      });
    } else {
      return;
    }
  });
};

client.on("ready", setSchedules);

client.login(process.env.TOKEN);
