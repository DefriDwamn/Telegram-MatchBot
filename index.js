const telegramApi = require('node-telegram-bot-api');
const sequelize = require('./db');
const userModel = require('./models');
const options = require('./options');
const lang = require('./language');
const token = require('./token');
const { Op } = require("sequelize");
const { registerOptions, sexOptions, sex_likeOptions, userInLikeOptions, deleteKeyboardOptions } = require('./options');

const bot = new telegramApi(token, { polling: true });
const botCommands = [{ command: '/myprofile', description: 'Профиль' }]

async function botInit() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (e) {
        console.log("Bad connection to DB: ", e);
    }
    bot.setMyCommands(botCommands);

    bot.on('message', async msg => {
        const text = msg.text;
        const name = msg.chat.username;
        const photo = msg.photo;
        const contact = msg.contact;
        const chatId = msg.chat.id;
        let user = await userModel.findOne({ where: { chatId: chatId.toString() } });
        let otherUser;

        try {
            if (user === null) {
                if (text === '/start') {
                    user = await userModel.create({ chatId: chatId.toString() });
                    console.log(user)
                    await bot.sendMessage(chatId, `Приветствую в Matchin боте!`);
                    return bot.sendMessage(chatId, `Если вы хотите использовать Matchin, вам необходимо подтвердить свой аккаунт.`, registerOptions)

                }
                return defualtReturn(user, chatId)
            }

            if (text === '/myprofile') {
                if (user.phoneNumber === null) {
                    return bot.sendMessage(chatId, `Если вы хотите использовать Matchin, вам необходимо подтвердить свой аккаунт.`, registerOptions)
                }
                if (!isUserHaveFullProfile(user)) {
                    user.stateMsg = 1;
                    return bot.sendMessage(chatId, `Ваша анкета пуста! Вам необходимо ее заполнить.`, options.setProfileOptions("📝"))
                }
                user.stateMsg = 0;
                user.likeUsersState = false;
                return userProfileShow(user, chatId);
            }

            if (text === '/info' && user.stateMsg == 0 && user.likeUsersState != true) {
                user.stateMsg = 0;
                return bot.sendMessage(chatId, `Я люблю жаренные пельмени!!!`, deleteKeyboardOptions)
            }

            if (contact !== undefined && contact.user_id === chatId) {
                user.phoneNumber = contact.phone_number;
                return bot.sendMessage(chatId, `Вы успешно зарегистрировались!`, deleteKeyboardOptions)
            }
            //name
            if (text == '📝' && (user.stateMsg == 1 || isUserHaveFullProfile(user))) {
                user.stateMsg = 2;

                if (user.name !== null) {
                    return bot.sendMessage(chatId, `Укажите ваше имя:`, options.setProfileOptions(user.name.toString()))
                }
                return bot.sendMessage(chatId, `Укажите ваше имя:`, deleteKeyboardOptions)
            }
            //name -> age
            if (text !== null && typeof (text) == 'string' && user.stateMsg == 2 && text.indexOf('/') == -1) {
                user.stateMsg = 3;
                user.name = text;
                if (user.age !== null) {
                    return bot.sendMessage(chatId, `Укажите ваш возраст:`, options.setProfileOptions(user.age))
                }
                return bot.sendMessage(chatId, `Укажите ваше возраст:`, deleteKeyboardOptions)
            }
            //age -> sex
            if (text > 13 && text < 100 && user.stateMsg == 3) {
                user.stateMsg = 4;
                user.age = text;
                return bot.sendMessage(chatId, `Выберите ваш пол:`, sexOptions)
            }
            //sex -> sex_like
            if ((text === lang.male || text === lang.female) && user.stateMsg == 4) {
                user.stateMsg = 5;
                user.sex = text;
                return bot.sendMessage(chatId, `Выберите пол для поиска:`, sex_likeOptions)
            }
            //sex_like
            if ((text === lang.males || text === lang.females || text === lang.anySex) && user.stateMsg == 5) {
                user.stateMsg = 6;
                user.sex_like = text;
                return bot.sendMessage(chatId, "Пришлите фото:", deleteKeyboardOptions)
            }
            //photo
            if (photo != undefined && user.stateMsg == 6) {
                user.stateMsg = 0;
                const file_id = msg.photo[2].file_id;
                if (file_id != undefined) {
                    user.photoId = file_id;
                    return userProfileShow(user, chatId)
                }
                return defualtReturn(user, chatId)
            }

            if (text == "📸" && isUserHaveFullProfile(user) && user.likeUsersState != true && user.stateMsg == 0) {
                user.stateMsg = 6;
                return bot.sendMessage(chatId, "Пришлите фото:", deleteKeyboardOptions)
            }

            if (text == "🔫" && isUserHaveFullProfile(user) && user.likeUsersState != true && user.stateMsg == 0) {
                user.likeUsersState = true;
                try {
                    let checkedUsers = new Array();
                    if (user.checkedUsersСhatId != null) {
                        checkedUsers = user.checkedUsersСhatId;
                    }
                    otherUser = await otherUserSet(user.sex, user.sex_like, checkedUsers, chatId)
                } catch (e) {
                    console.log(e);
                    return defualtReturn(user, chatId)
                }

                if (otherUser === null) {
                    user.likeUsersState = false;
                    user.lastOtherUser = null;
                    return bot.sendMessage(chatId, "Анкеты закончились! Приходите попозже.", deleteKeyboardOptions)
                }

                try {
                    user.lastOtherUser = otherUser.chatId;
                    return otherUserProfileShow(otherUser, chatId)
                } catch (e) {
                    console.log(e);
                    return defualtReturn(user, chatId)
                }
            }

            if ((text == "👀" || text == "🤮") && user.likeUsersState == true) {
                addOtherUserToChecked(user, user.lastOtherUser, chatId);
                if (text == "👀") {
                    lastOtherUser = await userModel.findOne({ where: { chatId: user.lastOtherUser } });
                    addToOtherUserLike(user.chatId, lastOtherUser);
                }

                try {
                    let checkedUsers = new Array();
                    if (user.checkedUsersСhatId != null) {
                        checkedUsers = user.checkedUsersСhatId;
                    }
                    otherUser = await otherUserSet(user.sex, user.sex_like, checkedUsers, chatId)
                } catch (e) {
                    console.log(e);
                    return defualtReturn(user, chatId)
                }

                if (otherUser === null) {
                    user.likeUsersState = false;
                    user.lastOtherUser = null;
                    return bot.sendMessage(chatId, "Анкеты закончились! Приходите попозже.", deleteKeyboardOptions)
                }

                try {
                    user.lastOtherUser = otherUser.chatId;
                    return otherUserProfileShow(otherUser, chatId)
                } catch (e) {
                    console.log(e);
                    return defualtReturn(user, chatId)
                }
            }

            if (text == "🚪" && user.likeUsersState == true) {
                user.likeUsersState = false;
                return userProfileShow(user, chatId)
            }
            if(user.likeUsersChatId !== null){
                if(user.likeUsersState = true){
                    return bot.sendMessage(chatId, `Хватит смотреть анкеты, у вас ${user.likeUsersChatId.length()} match'ей`)
                }
                if(text === "👀"){

                }
                for(var likesUser in user.likeUsersChatId){
                     
                }
            }
            return defualtReturn(user, chatId)
        } catch (e) {
            console.log(e);
            return bot.sendMessage(chatId, `Произошла ошибка!`)
        }
    })
}

async function userProfileShow(user, chatId) {
    textProfile = `${user.name}, ${user.age}\n\nПол: ${user.sex}\nПол для поиска: ${user.sex_like}\n\n📝 - изменить анкету\n📸 - изменить фото\n🔫 - оценивать анкеты\n`
    await bot.sendPhoto(chatId, user.photoId, options.setUserOptions(textProfile))
}

async function otherUserSet(userSex, userSexLike, userCheckedArray, chatId) {
    let otherUser;
    if (userSexLike == lang.anySex) {
        if (userSex == lang.female) {
            otherUser = await userModel.findOne({
                order: sequelize.random(),
                where:
                    sequelize.and(
                        sequelize.or({ sex_like: lang.females }, { sex_like: lang.anySex }),
                        { chatId: { [Op.ne]: chatId.toString() } },
                        { chatId: { [Op.notIn]: userCheckedArray } }
                    )
            })
        } else {
            otherUser = await userModel.findOne({
                order: sequelize.random(),
                where:
                    sequelize.and(
                        sequelize.or({ sex_like: lang.males }, { sex_like: lang.anySex }),
                        { chatId: { [Op.ne]: chatId.toString() } },
                        { chatId: { [Op.notIn]: userCheckedArray } }
                    )
            })
        }
    } else {
        let otherUserSex;
        let otherUserSexLike;
        if (userSexLike == lang.females) {
            otherUserSex = lang.female;
        } else if (userSexLike == lang.males) {
            otherUserSex = lang.male;
        }
        if (userSex == lang.female) {
            otherUserSexLike = lang.females;
        } else if (userSex == lang.male) {
            otherUserSexLike = lang.males;
        }
        otherUser = await userModel.findOne({
            order: sequelize.random(),
            where:
                sequelize.and(
                    sequelize.or({ sex_like: otherUserSexLike }, { sex_like: lang.anySex }),
                    { sex: otherUserSex },
                    { chatId: { [Op.ne]: chatId.toString() } },
                    { chatId: { [Op.notIn]: userCheckedArray } }
                )
        })
    }
    return otherUser
}

async function otherUserProfileShow(otherUser, chatId) {
    textProfile = `${otherUser.name}, ${otherUser.age}`
    await bot.sendPhoto(chatId, otherUser.photoId, options.setOtherUserOptions(textProfile))
}

function addOtherUserToChecked(user, otherUserId, chatId) {
    let checkedUsers;
    if (user.checkedUsersСhatId === null) {
        checkedUsers = new Array();
        checkedUsers.push(otherUserId);
        user.checkedUsersСhatId = checkedUsers;
    } else {
        checkedUsers = user.checkedUsersСhatId;
        if (checkedUsers.indexOf(otherUserId) == -1) {
            checkedUsers.push(otherUserId);
            user.checkedUsersСhatId = checkedUsers;
        }
    }
}

function addToOtherUserLike(userChatId, otherUser) {
    let likesInOtherUser;
    if (otherUser.likeUsersChatId === null) {
        likesInOtherUser = new Array();
        likesInOtherUser.push(userChatId);
        otherUser.likeUsersChatId = likesInOtherUser;
    } else {
        likesInOtherUser = otherUser.likeUsersChatId;
        if (likesInOtherUser.indexOf(userChatId) == -1) {
            likesInOtherUser.push(userChatId);
            otherUser.likeUsersChatId = likesInOtherUser;
        }
    }
}

function isUserHaveFullProfile(user) {
    if (user.name !== null && user.age !== null && user.sex !== null && user.sex_like !== null && user.stateMsg !== null && user.photoId !== null) {
        return true
    }
    return false
}

async function defualtReturn(user, chatId) {
    if (user !== null) {
        user.stateMsg = 0;
        if (user.likeUsersState == true) {
            user.likeUsersState = false;
        }
    }
    await bot.sendMessage(chatId, `Что-то не так!`, deleteKeyboardOptions)
}

botInit()
