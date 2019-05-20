const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PicSchema = new Schema({
    name: String,
    path: String,
})

PicSchema.methods = {

}

PicSchema.statics = {
    testAdd: function(){
        console.log(this)
    }
}

module.exports = mongoose.model('Pic', PicSchema)