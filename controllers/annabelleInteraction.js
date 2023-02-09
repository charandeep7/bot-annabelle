const { random, maths } = require("glowing-engine");

function handleInteractionPING(interaction) {
  return interaction.reply("Pong!");
}

async function handleInteractionADVICE(interaction) {
  return random.randomAdvice().then((res) => interaction.reply(res));
}

function handleInteractionEVALUATE(interaction, expression) {
  return interaction.reply(`${maths.evaluateExpression(expression) + ""}`);
}

module.exports = {
  handleInteractionPING,
  handleInteractionADVICE,
  handleInteractionEVALUATE,
};
