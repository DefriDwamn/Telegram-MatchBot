const matchHandler = require('.');
const userModel = require('../models/user');

module.exports = class like extends matchHandler {
    constructor(bot) {
        super(bot);
    }

    async handler(message) {
        const chatId = message.chat.id;

        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });
    }
    
/*
    async function showUserWithLikeToYou(user, bot) {
        let searchUser = await getFirstLikesUser(user);
        user.lastOtherUser = searchUser.chatId;
        profileText = `Твоя анкета понравилась:\n\n${searchUser.name}, ${searchUser.age}\n\n${searchUser.description}`;
        await bot.sendPhoto(user.chatId, searchUser.photoId, options.searchUserProfileOptionsCustom(profileText));
    }
    
    async function getFirstLikesUser(user) {
        let likeUsers = user.likeUsersChatId;
        let likeUserChatId = likeUsers[0];
        return searchUser = await userModel.findOne({ where: { chatId: likeUserChatId } });
    }
    
    async function showProfilesToMatch(user, otherUser, bot) {
        profileText = `Match!\n\n${user.tgTag}, ${user.age}\n\n${user.description}`;
        await bot.sendPhoto(otherUser.chatId, user.photoId, options.searchUserProfileOptionsCustom(profileText));
    
        profileText = `Match!\n\n${otherUser.tgTag}, ${otherUser.age}\n\n${otherUser.description}`;
        await bot.sendPhoto(user.chatId, otherUser.photoId, options.searchUserProfileOptionsCustom(profileText));
    }
    
    function deleteCheckLikesOtherUser(user) {
        let likeUsers = user.likeUsersChatId;
        likeUsers.splice(0, 1);
        user.likeUsersChatId = likeUsers;
    }
    
    async function showSearchUserProfileShow(user, chatId, bot) {
        let checkedUsers = new Array();
        if (user.checkedUsersСhatId != null) {
            checkedUsers = user.checkedUsersСhatId;
        }
        let otherUser = await getSearchUserProfile(user.sex, user.sex_like, checkedUsers, chatId);
        if (otherUser == null) {
            user.lastOtherUser = null;
            await bot.sendMessage(chatId, "Анкеты закончились! Приходите попозже.");
            await checkUserAndSendProfile(user, chatId, bot);
        } else {
            user.lastOtherUser = otherUser.chatId;
            profileText = `${otherUser.name}, ${otherUser.age}\n\n${otherUser.description}`;
            await bot.sendPhoto(chatId, otherUser.photoId, options.searchUserProfileOptionsCustom(profileText));
        }
    }
    
    async function getSearchUserProfile(userSex, userSexLike, userCheckedArray, chatId) {
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
    
    function addSearchUserToChecked(user, otherUserId) {
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
    
    function addToSearchUserLike(userChatId, otherUser) {
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
    */
}
