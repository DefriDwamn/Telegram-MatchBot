const userModel = require('../models/user');
const options = require('../options');

module.exports = (bot) => async (message) => {
    const chatId = message.chat.id;
    try {
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });

        const contactPhone = message.contact.phone_number;
        const contactId = message.contact.user_id;

        if (!user.phoneNumber && chatId == contactId) {
            user.phoneNumber = contactPhone;
            await bot.sendMessage(chatId, `Вы успешно авторизовались!`, options.deleteKeyboardOptions)
        }
    } catch (err) {
        console.log(err);
    }
}