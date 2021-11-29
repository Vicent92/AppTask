const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserModel = new Schema({
    name: String,
    username: String,
    passwordhash: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
})

UserModel.set('toJSON', {
    transform: (document, returnedObjest) => {
        returnedObjest.id = returnedObjest._id.toString()
        delete returnedObjest._id
        delete returnedObjest.__v
        delete returnedObjest.passwordhash
    }
})

const User = model('User', UserModel)


module.exports = User