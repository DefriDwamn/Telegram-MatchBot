const messageValidator = require('.');
const userModel = require('../models/user');

module.exports = class name extends messageValidator {
    constructor(bot) {
        super(bot);
    }

    async listenReplyMessage(message) {
        const chatId = message.chat.id;
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });
        
        const { message_id } = await this.bot.sendMessage(chatId, 'Отправь свое имя:', { reply_markup: JSON.stringify({ force_reply: true }) });

        const listener = this.bot.onReplyToMessage(
            chatId,
            message_id,
            async reply => {
                this.bot.removeReplyListener(listener);

                const text = reply.text;
                if (text !== null && typeof (text) == 'string' && text.indexOf('/') == -1) {

                    user.name = text;
                }
            }
        );
    }
}