const TelegramBot = require('node-telegram-bot-api');

const token = '858677831:AAEEm7cbSy5GV4J5Lr4ljagwXjAl3qMLQ-U';
const url = process.env.APP_URL || 'https://revert-bot.herokuapp.com:443';
const options = {
  webHook: {
    port: process.env.PORT,
  },
};

const bot = new TelegramBot(token, options);
bot.setWebHook(`${url}/bot${token}`);

bot.onText(/\/curse/, (msg, match) => {
  const chatId = msg.chat.id;
  const reverted = msg.text.split('').revert().join('')
  bot.sendMessage(chatId, 'reverted')
});