const TelegramBot = require('node-telegram-bot-api');

const token = '801389212:AAE9vpkNalGg3QJx2HdK6W1RzWr9ZqzQNjw';
const url = process.env.APP_URL || 'https://reverse-text-bot.herokuapp.com:443';
const options = {
  webHook: {
    port: process.env.PORT,
  },
};

const bot = new TelegramBot(token, options);
bot.setWebHook(`${url}/bot${token}`);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Отправь мне любое сообщение и я перепишу его в обратном порядке.')
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const reversed = msg.text.split('').reverse().join('');
  bot.sendMessage(chatId, reversed);
});