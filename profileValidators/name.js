const messageValidator = require('.');
const userModel = require('../models/user');
const { checkUserAndSendProfile } = require('../inputs/profile');

module.exports = class name extends messageValidator {
    constructor(bot) {
        super(bot);
    }

    async listenReplyMessage(message) {
        const chatId = message.chat.id;

        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });

        const messageToReplyText = 'Введите ваше имя:';
        const message_id = await super.messageToReply(chatId, messageToReplyText);

        const listener = await this.bot.onReplyToMessage(
            chatId,
            message_id,
            async reply => {
                this.bot.removeReplyListener(listener);
                const text = reply.text;

                if (text !== null && typeof (text) == 'string' && text.indexOf('/') == -1) {
                    user.name = text;
                    await checkUserAndSendProfile(user, chatId, this.bot);
                } else {
                    await this.bot.sendMessage(chatId, 'Неверное имя!');
                    await checkUserAndSendProfile(user, chatId, this.bot);
                }
            }
        );
    }
}