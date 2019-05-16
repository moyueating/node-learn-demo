module.exports = {
    logger(req, res, next){
        console.log('this is logger middleware')
        next()
    },
    hello(req, res, next){
        if(req.url.match(/^\/hello/)){
            res.end('hello world')
        }else{
            console.log('not hello')
            next()
        }
    },
    users(req, res, next){
        const users = ['guest', 'admin']
        const match = req.url.match(/^\/user\/(.+)/)
        if(match){
            const name = match[1]
            if(users.indexOf(name) > -1){
                res.end(`hello ${name}`)
            }else{
                const err = new Error('user not found')
                err.notFound = true
                next(err)
            }
        }else{
            next()
        }
    },
    errHandler(msg){
        return function(err, req, res, next){
            console.log(err)
            res.end(`${msg} ${err}`)
        }
    }
}