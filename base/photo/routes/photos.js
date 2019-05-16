const express = require('express');
const router = express.Router();
const Photos = require('../models/Photo')

new Photos({name: 'this is from node'}).save().then(() => {
    console.log('success')
})


const photos = [{
    name: 'nodejs logo',
    path: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=c653f6878d01a18bf0eb1549a6146035/9825bc315c6034a81358c82ac1134954082376e6.jpg'
}, {
    name: 'nodejs logo',
    path: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=c653f6878d01a18bf0eb1549a6146035/9825bc315c6034a81358c82ac1134954082376e6.jpg'
}]

router.get('/', (req, res, next) => {
    res.render('photos', {
        title: 'photos',
        photos,
    })
})

module.exports = router