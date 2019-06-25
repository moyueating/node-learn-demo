const mongoose = require('mongoose')
const Pics = require('../models/pics')


/**
 * List
 */
exports.index = function(req, res, next){
    Pics.find().exec().then(pics => {
        console.log('list data', pics)
        res.render('pics', {
            pics,
            title: 'this is pic list page'
        })
    })
}

exports.add = function(req, res, next){
    const instance = new Pics({
        name: Math.random() ? 'www.com' : 'test.com',
        path: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=c653f6878d01a18bf0eb1549a6146035/9825bc315c6034a81358c82ac1134954082376e6.jpg'
    })
    instance.save(((err, pic) => {
        if(err) console.log(err)
        console.log(`save successful: ${pic}`)
        res.end()
    }))
}