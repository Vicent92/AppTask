const bcrypt = require('bcryptjs')
const UserRouter = require('express').Router()
const User = require('../Model/User')

UserRouter.get('/', async (request, response) => {
    const Users = await User.find({}).populate('notes', {
        content: 1,
        date: 1
    })
    response.json(Users)
})

UserRouter.post('/', async (request, response) => {
    const { body } = request
    const { name, username, password } = body

    const passwordhash = await bcrypt.hash(password, 10)

    const newuser = new User ({
        name,
        username,
        passwordhash
    })

    try{
        const saveuser = await newuser.save()
    response.json(saveuser)
    } catch(err){
        console.error(err)
    }
})

module.exports = UserRouter