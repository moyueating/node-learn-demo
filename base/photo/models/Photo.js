const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/photo')

const Schema = mongoose.Schema



const Photo = new Schema({
    name: String,
    path: String,
})

module.exports = mongoose.model('Photo', Photo)