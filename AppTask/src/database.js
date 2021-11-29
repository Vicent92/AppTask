const mongoose = require('mongoose')

const { MONGO_DB } = process.env

const StringConection = MONGO_DB

mongoose.connect(StringConection)
    .then(() => {
        console.log('conect DB')
    })
    .catch(err => {
        console.error(err)
    })

   module.exports = mongoose



    