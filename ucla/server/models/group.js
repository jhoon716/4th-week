const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
    gid: {type: Number, unique: true},
    name: String,
    admin: String,
    description: String,
    users: [String]
})

module.exports = mongoose.model('group', groupSchema)