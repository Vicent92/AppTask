const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const LoginRouter = require('express').Router()
const User = require('../Model/User')

LoginRouter.post('/', async (request, response) => {
    const { body } = request
    const { username, password } = body

    const user = await User.findOne({username})

    const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.passwordhash);

    if(!(user && passwordCorrect)){
        response.status(401).json({
            error: 'invalid user or password'
        })
    }

    const UserForToken = {
        id: user._id,
        username: user.username
    }

    const token = jwt.sign(UserForToken, 
        process.env.SECRET, {
            expiresIn: 60 * 60 * 7 * 24
        })

    response.send({
        name: user.name,
        usename: user.username,
        token
    })
})

module.exports = LoginRouter