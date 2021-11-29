require('dotenv').config()

const { request, response, json } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongo = require('./src/database')
// const HandleError = require('./src/Middlewares/HandleError')

// MIDDLEWARES
app.use(json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('../react-task/build'))

// ROUTER
app.use('/api/login', require('./src/router/Login'))
app.use('/api/users', require('./src/router/User'))
app.use('/api/notes', require('./src/router/index'))

//ERROR
// app.use(HandleError)

//SERVER

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server run on PORT ${PORT}`)
})