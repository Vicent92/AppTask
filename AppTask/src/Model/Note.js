const mongoose = require('mongoose')
const { Schema, model } = mongoose

const NoteModel = new Schema({
    content: String,
    date: Date,
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

NoteModel.set('toJSON', {
    transform: (document, returnedObjest) => {
        returnedObjest.id = returnedObjest._id.toString()
        delete returnedObjest._id
        delete returnedObjest.__v
    }
})

const Note = model('Note', NoteModel)


module.exports = Note