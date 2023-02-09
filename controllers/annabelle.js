const { random } = require("glowing-engine");

const emojis = [
  "😀",
  "😁",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "🥰",
  "😗",
  "😙",
  "🥲",
  "😚",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "🫡",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🫥",
  "😶‍🌫️",
  "🙄",
  "😏",
  "😣",
  "😮",
  "🤐",
  "😯",
  "🥱",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
  "😒",
  "🙃",
  "🫠",
  "🤑",
  "😲",
  "😟",
];

function handlewelcomeReply(message) {
  const userName = message.author.username;
  return message.reply({
    content: `Hey **${userName}** ${random.randomPickFromArray(
      emojis
    )} \n MISS ME ? 👀`,
  });
}

function handleGetTime(message) {
  const userName = message.author.username;
  const date = new Date();
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const timeOffset = 5 + 30 / 60;
  const India = new Date(utcTime + 3600000 * timeOffset).toLocaleTimeString();
  return message.reply({
    content: `It's ${India} ${userName} and The server timing is ${new Date().toLocaleTimeString()}.`,
  });
}

function handleGetDate(message) {
  const userName = message.author.username;
  const date = new Date();
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const timeOffset = 5 + 30 / 60;
  const India = new Date(utcTime + 3600000 * timeOffset).toLocaleDateString();
  return message.reply({
    content: `It's ${India} ${userName} and The server date is ${new Date().toLocaleDateString()}.`,
  });
}

function handleTagWelcomeMessgae(message) {
  const userName = message.author.username;
  const admin = message.author.id;
  return message.channel.send(
    `Hey **${userName}** ${random.randomPickFromArray(
      emojis
    )}. I'm a bot which is developed by <@${admin}>`
  );
}

function handleSpam(canSpam, message, text = "Kitish") {
  if (canSpam === false) {
    return message.reply({
      content: `SORRY !!! MAX_LIMIT = 100 \n Actually, I'm hosted on a free server so it may create issue for me.`,
    });
  }
  return message.reply({
    content: `${text}`,
  });
}

function handleTemp(message) {
  return message.reply({
    content: `YES, **CAT** IS PRESENT IN THIS SERVER`,
  });
}

function handle404(message) {
  return message.reply({
    content: `Thanks for your message. I'm still learning.`,
  });
}

module.exports = {
  handlewelcomeReply,
  handleGetTime,
  handleGetDate,
  handleTagWelcomeMessgae,
  handleTemp,
  handleSpam,
  handle404,
};
