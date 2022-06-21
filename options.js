module.exports = {
    registerOptions: {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: "☎️", request_contact: true }]
            ]
        })
    },
    sexOptions: {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: "Парень" }],
                [{ text: "Девушка" }]
            ]
        })
    },
    sex_likeOptions: {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: "Парни" }],
                [{ text: "Девушки" }],
                [{ text: "Любой" }]
            ]
        })
    },
    userInLikeOptions: {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: "🚪" }, { text: "👀" }, { text: "🤮" }],
            ],
            resize_keyboard: true
        })
    },
    deleteKeyboardOptions: {
        reply_markup: JSON.stringify({
            remove_keyboard: true
        })
    },
    setProfileOptions(pasteText) {
        return {
            reply_markup: JSON.stringify({
                keyboard: [
                    [{ text: pasteText }]
                ],
                resize_keyboard: true
            })
        }
    },
    setUserOptions(pasteText) {
        return {
            caption: pasteText,
            reply_markup: JSON.stringify({
                keyboard: [
                    [{ text: "📝" }],
                    [{ text: "📸" }],
                    [{ text: "🔫" }],
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            })
        }
    },
    setOtherUserOptions(pasteText) {
        return {
            caption: pasteText,
            reply_markup: JSON.stringify({
                keyboard: [
                    [{ text: "🚪" }, { text: "👀" }, { text: "🤮" }],
                ],
                resize_keyboard: true
            })
        }
    }
}