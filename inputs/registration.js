const userModel = require('../models/user');
const options = require('../options');
const { checkUserAndSendProfile } = require('./profile');

module.exports = (bot) => async (message) => {
    const chatId = message.chat.id;
    try {
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });
        console.log(message)
        const contactPhone = message.contact.phone_number;
        const contactId = message.contact.user_id;
        const tgTag = "@"+message.from.username;
        if (!user.phoneNumber && chatId == contactId) {
            user.phoneNumber = contactPhone;
            user.tgTag = tgTag;
            user.likeUsersChatId = [];
            await bot.sendMessage(chatId, `Вы успешно авторизовались!`, options.deleteKeyboardOptions);
            await checkUserAndSendProfile(user, chatId, bot);
        }
    } catch (err) {
        console.log(err);
    }
}