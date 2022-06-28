const messageValidator = require('.');
const userModel = require('../models/user');
const { checkUserAndSendProfile } = require('../inputs/profile');

module.exports = class age extends messageValidator {
    constructor(bot) {
        super(bot);
    }

    async listenReplyMessage(message) {
        const chatId = message.chat.id;

        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });

        const messageToReplyText = 'Введите ваш возраст:';
        const message_id = await super.messageToReply(chatId, messageToReplyText);

        const listener = await this.bot.onReplyToMessage(
            chatId,
            message_id,
            async reply => {
                this.bot.removeReplyListener(listener);
                const text = reply.text;

                if (text > 10 && text < 100) {
                    user.age = text;
                    await checkUserAndSendProfile(user, chatId, this.bot);
                } else {
                    await this.bot.sendMessage(chatId, 'Неверный возраст!');
                    await checkUserAndSendProfile(user, chatId, this.bot);
                }
            }
        );
    }
}