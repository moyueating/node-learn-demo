const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/photo', { useNewUrlParser: true })
const db = mongoose.connection


db.on('error', function(err){
    console.log(err)
})


db.once('open', function(){
    console.log('connected!!!!!!!')

    const photoSchema = new mongoose.Schema({
        name: String,
        path: String,
    })

    const Pics = mongoose.model('Pics', photoSchema)
    // logo pic
    const logo = new Pics({
        name: 'logo',
        path: 'https://baidu.com'
    })
    console.log(logo)
    logo.save((err, logo) => {
        console.log('logo is saved:' , logo)
    })

})


module.exports = []