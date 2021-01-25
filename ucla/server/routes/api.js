const express = require('express')
const router = express.Router()
const User = require("../models/user")
const Message = require("../models/message")

router.get('/users', function(req, res) {
    User.find({}, {_id: 0, id: 1, name: 1, profile: 1, status: 1}, (err, results) => {
        if (err) return res.status(500).send({error: "Database error"})
        res.json(results)
    })
})

// Get all messages sent to 'user'
router.get('/sheets/:user', function(req, res) {
    Message.find({dst: req.params.user}, {content: 1, time: 1}, (err, messages) => {
        if (err) return  res.status(500).send({error: "Database error"})
        res.json(results)
    })
})

// Create a message
router.post('/sheets', function(req, rest) {
    let message    = new Message()
    message.sender   = req.body.sender
    message.receiver = req.body.receiver
    message.content  = req.body.content
    message.time = new Date()

    message.save(function(err) {
        if(err) {
            console.error(err)
            res.json({result: 0})
            return
        }
        res.json({result: 1})
    })
})

// Delete a message
router.delete('/sheets', function(req, res) {
    Message.remove({_id: req.body.id}, function(err, output) {
        if (err) return res.status(500).json({ err: 'database failure' })

        res.status(204).end()
    })
})

module.exports = router