const express   = require('express')
const router    = express.Router()
const fs        = require('fs')
const jwt       = require('jsonwebtoken')
const User      = require("../models/user")
const Message   = require("../models/message")
const secretObj   = require("../config/jwt")

router.get('/users', function(req, res) {
    User.find({}, {_id: 0, id: 1, name: 1, profile: 1, status: 1, introduction: 1}).sort({name: 1}).exec(function(err, results) {
        if (err) return res.status(500).send({error: "Database error"})
        res.json(results)
    })
})

router.get('/users/:id', function(req, res) {
    User.findOne({id: req.params.id}, {_id: 0, id: 1, name: 1, profile: 1, status: 1, introduction: 1}, function(err, user) {
        if (err) return res.status(500).send({error: "Database error"})
        if (!user) return res.status(404).json({error: 'user not found'})
        res.json(user)
    })
})

router.get('/users/profile/:id', function(req, res) {
    User.findOne({id: req.params.id}, function(err, user) {
        if (err) return res.status(500).send({error: err})
        if (!user) return res.status(404).json({error: 'user not found'})
        const image = fs.readFileSync(__dirname + "/../profiles/" + user.profile)
        res.writeHead(200, {'Content-Type': 'image/png'})
        res.end(image, 'binary')
    })
})

// Get all messages sent to 'user'
router.get('/message', function(req, res) {
    const token = req.cookies.user
    const decoded = jwt.decode(token, secretObj.secret)
    console.log(req.cookies)
    if (decoded) {
        const userId = decoded.id
        Message.find({receiver: userId}, {content: 1, time: 1}, (err, messages) => {
            if (err) return res.status(500).send({error: "Database error"})
            res.json(messages)
        })
    } else {
        return res.status(401).send("No authority to access.")
    }
})

// Create a message
router.post('/message', function(req, rest) {
    let message    = new Message()
    message.sender   = req.body.sender
    message.receiver = req.body.receiver
    message.content  = req.body.content
    message.time = new Date()

    message.save(function(err) {
        if(err) {
            console.error(err)
            rest.json({result: 0})
            return
        }
        rest.json({result: 1})
    })
})

// Delete a message
router.delete('/message', function(req, res) {
    Message.remove({_id: req.body.id}, function(err, output) {
        if (err) return res.status(500).json({ err: 'database failure' })

        res.status(204).end()
    })
})

module.exports = router