let express = require('express')
let router = express.Router()

router.get('/', function(req, res, next) {
    res.send('404找不到了');
})

module.exports = router