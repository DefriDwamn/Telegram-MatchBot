const messageValidator = require('.');
const userModel = require('../models/user');

module.exports = class sexLike extends messageValidator {
    constructor(bot) {
        super(bot);
    }

    async listenReplyMessage(message) {
        const chatId = message.chat.id;
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });
        
        const { message_id } = await this.bot.sendMessage(chatId, 'text', { reply_markup: JSON.stringify({ force_reply: true }) });

        const listener = this.bot.onReplyToMessage(
            chatId,
            message_id,
            async reply => {
                this.bot.removeReplyListener(listener);

                const text = reply.text;
                //if
            }
        );
    }
}