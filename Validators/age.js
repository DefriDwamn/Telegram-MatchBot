const messageValidator = require('.');
const userModel = require('../models/user');

module.exports = class age extends messageValidator {
    constructor(bot) {
        super(bot);
    }

    async listenReplyMessage(message) {
        const chatId = message.chat.id;
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });
        
        const { message_id } = await this.bot.sendMessage(chatId, 'Отправь свой возраст(от 13):', { reply_markup: JSON.stringify({ force_reply: true }) });

        const listener = this.bot.onReplyToMessage(
            chatId,
            message_id,
            async reply => {
                this.bot.removeReplyListener(listener);

                const text = reply.text;
                if (text > 13 && text < 100) {
                    user.age = text;
                }
            }
        );
    }
}