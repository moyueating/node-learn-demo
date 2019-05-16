const { logger, hello, errHandler, users } = require('./middleware')

const connect = require('connect')

// api内部的错误由内部的错误中间件处理
const api = connect()
api.use(users)
api.use(errHandler('this is from api errHandler'))


const app = connect()
app.use(hello)
app.use('/api', api)
// 全局错误
app.use(errHandler('this is from global errHandler'))


app.listen(3333, function(){
    console.log('connect starting ')
})