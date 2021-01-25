const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    group: Number,
    sender: String,
    receiver: String,
    content: String,
    time: Date
})

module.exports = mongoose.model('message', messageSchema)