const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error('Please provide a correct bot token');
}

const url = process.env.APP_URL || 'https://reverse-text-bot.herokuapp.com:443';
const options = {
  webHook: {
    port: process.env.PORT,
  },
};

const bot = new TelegramBot(token, options);
bot.setWebHook(`${url}/bot${token}`);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const response = msg.text === '/start' ? `Привет, ${msg.from.first_name}! Отправь мне любое сообщение и я перепишу его в обратном порядке.` : msg.text.split('').reverse().join('');
  bot.sendMessage(chatId, response);
});
