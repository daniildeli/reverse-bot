const TelegramBot = require('node-telegram-bot-api');
const { BOT_TOKEN, APP_URL, } = process.env;

if (!BOT_TOKEN) {
  throw new Error('Please provide a correct bot token');
}

if (!APP_URL) {
  throw new Error('Please provide a correct app url');
}

const options = {
  webHook: {
    port: process.env.PORT,
  },
};

const bot = new TelegramBot(BOT_TOKEN, options);
bot.setWebHook(`${APP_URL}/bot${BOT_TOKEN}`);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const response = msg.text === '/start' ? `Hi, ${msg.from.first_name}! Send me any message and I will rewrite it in reverse order.` : msg.text.split('').reverse().join('');
  bot.sendMessage(chatId, response);
});
