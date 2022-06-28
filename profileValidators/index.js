const userModel = require('../models/user');
const options = require('../options')

module.exports = class messageValidator {
    constructor(bot) {
        this.bot = bot;
    }

    async listenReplyMessage(message) { }

    async messageToReply(chatId, text) {
        const { message_id } = await this.bot.sendMessage(chatId, text,
            { reply_markup: JSON.stringify({ force_reply: true }) });
        return message_id
    }
}