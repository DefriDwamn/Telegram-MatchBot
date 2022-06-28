const messageValidator = require('.');
const userModel = require('../models/user');
const { checkUserAndSendProfile } = require('../inputs/profile');

module.exports = class photo extends messageValidator {
    constructor(bot) {
        super(bot);
    }

    async listenReplyMessage(message) {
        const chatId = message.chat.id;

        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });

        const messageToReplyText = 'Отправьте ваше фото:';
        const message_id = await super.messageToReply(chatId, messageToReplyText);

        const listener = await this.bot.onReplyToMessage(
            chatId,
            message_id,
            async reply => {
                this.bot.removeReplyListener(listener);
                try {
                    const photo = reply.photo;
                    const photoId = photo[2].file_id;
                    if (photo && photoId) {
                        user.photoId = photoId;
                        await checkUserAndSendProfile(user, chatId, this.bot);
                    } else {
                        await this.bot.sendMessage(chatId, 'Неверное фото!');
                        await checkUserAndSendProfile(user, chatId, this.bot);
                    }
                } catch (err) {
                    await this.bot.sendMessage(chatId, 'Неверное фото!');
                    await checkUserAndSendProfile(user, chatId, this.bot);
                }
            }
        );
    }
}