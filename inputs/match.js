const userModel = require('../models/user');
const lang = require('../utils/lang');
const options = require('../options');
const { Op } = require('sequelize');
const { sequelize } = require('../db');
const { checkUserAndSendProfile } = require('./profile');
const user = require('../models/user');

const match = (bot) => async (message) => {
    const chatId = message.chat.id;
    try {
        const text = message.text;
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });

        if (!user.matchMode && !user.profileEditMode) {
            if (text == lang.emodjiMatch) {
                user.matchMode = true;
            }
        }
        if (user.matchMode) {
            if (text == lang.emodjiLike) {
                
            }
            if (text == lang.emodjiDisLike) {

            }
            if (text == lang.emodjiLeaveMatch) {

            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    match
}