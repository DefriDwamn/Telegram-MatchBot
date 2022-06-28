require("dotenv").config();
const env = process.env;

const { DBconnection } = require('./db');
const inputs = require('./inputs');
const lang = require('./utils/lang');
const telegramApi = require('node-telegram-bot-api');
const bot = new telegramApi(env.TG_TOKEN, { polling: true });

const initBot = async () => {
    DBconnection();
    bot.setMyCommands([{ command: '/profile', description: 'Профиль' }]);

    bot.onText(lang.startRegExp, inputs.start(bot));
    bot.onText(lang.profileRegExp, inputs.profile.profile(bot));
    bot.onText(lang.profileEditRegExp, inputs.profile.profileEdit(bot));
    bot.onText(lang.matchRegExp, inputs.match.match(bot));

    bot.on("contact", inputs.registration(bot));
    bot.on("callback_query", inputs.queryCallback(bot));
}

initBot();
