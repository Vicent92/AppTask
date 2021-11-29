const express = require('express')
const { body } = require('express-validator')
const userExtrator = require('../Middlewares/userExtrator')
const router = express()
// const mongoose = require('mongoose')
const Note = require('../Model/Note')
const UserModel = require('../Model/User')


router.get('/', async (request, response) => {
    const notes = await Note.find({}).populate('user', {
        name: 1,
        username: 1
    })
    response.json(notes)

})

router.get('/:id' , async (request, response, next) => {
    const { id } = request.params
    const note = await Note.findById(id)
        if (note){
            response.json(note)
        } else {
            response.status(404).json({ error: 'lo que buscas no esta'})
        }
})


router.post('/', userExtrator, async (request, response) => {
        const { content } = request.body

        const { user } = request

        const userId = await UserModel.findById(user)

        const newNote = new Note({
            content,
            date: new Date(),
            user: userId._id
        })

        const saveNote = await newNote.save()
        userId.notes = userId.notes.concat(saveNote._id)
        await userId.save()
        response.json(saveNote)
})

router.put('/:id', async (request, response) => {
    const { content } = request.body
    const { id } = request.params

    const newNote = { content }
    const noteUpdate = await Note.findByIdAndUpdate(id, newNote)

        response.json(newNote)


})

router.delete('/:id', async (request, response) => {
    const { id } = request.params
    await Note.findByIdAndRemove(id)

        response.status(204).end()
})

module.exports = router