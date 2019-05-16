const connect = require('connect')
const cookieParser = require('cookie-parser')
const app = connect()

app.use(cookieParser())
app.use(function(req, res, next){
    res.setHeader('Set-Cookie', 'foo=bar')
    next()
})
app.use(function(req, res){
    console.log(req.cookies)
    console.log('signedCookies', req.signedCookies)
    res.end('cookie')
})

app.listen(3333)