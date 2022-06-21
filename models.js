const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique:true},
    name: {type: DataTypes.STRING,
        set(value){
            this.setDataValue('name', value)
            this.save()
        }
    },
    age: {type: DataTypes.INTEGER,
        set(value){
            this.setDataValue('age', value)
            this.save()
        }
    },
    sex: {type: DataTypes.STRING,
        set(value){
            this.setDataValue('sex', value)
            this.save()
        }
    },
    sex_like: {type: DataTypes.STRING,
        set(value){
            this.setDataValue('sex_like', value)
            this.save()
        }
    },
    phoneNumber: {type: DataTypes.STRING, unique:true,
        set(value){
            this.setDataValue('phoneNumber', value)
            this.save()
        }
    },
    stateMsg: {type: DataTypes.INTEGER,
        set(value){
            this.setDataValue('stateMsg', value)
            this.save()
        }
    },
    checkedUsersСhatId: {type: DataTypes.ARRAY(DataTypes.STRING),
        set(value){
            this.setDataValue('checkedUsersСhatId', null)
            this.setDataValue('checkedUsersСhatId', value)
            this.save()
        }
    },
    likeUsersChatId: {type: DataTypes.ARRAY(DataTypes.STRING),
        set(value){
            this.setDataValue('likeUsersChatId', null)
            this.setDataValue('likeUsersChatId', value)
            this.save()
        }
    },
    likeUsersState: {type: DataTypes.BOOLEAN,
        set(value){
            this.setDataValue('likeUsersState', value)
            this.save()
        }
    },
    photoId: {type: DataTypes.STRING,
        set(value){
            this.setDataValue('photoId', value)
            this.save()
        }
    },
    lastOtherUser: {type: DataTypes.STRING,
        set(value){
            this.setDataValue('lastOtherUser', value)
            this.save()
        }
    },
})

module.exports = User;