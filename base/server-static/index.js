const http = require('http')
const path = require('path')
const url = require('url')
const mime = require('mime')
const zlib = require('zlib')
const EventEmitter = require('events')
const fs = require('fs')
const { port, rootPath, maxAge, gzipTypes } = require('./config')


http.createServer(serverHandler).listen(port, () => {
    console.log('server is listening on port 3333')
})


function serverHandler(req, res){

    class ResEmitter extends EventEmitter {}

    const resEmitter = new ResEmitter()
    // 使用自定义事件发射器的时候，最好一定添加error事件监听器
    // 在nodejs中如果没有给事件发射器添加啊error事件，当发生error时会抛出错误，退出Node.js进程
    resEmitter.on('error', code => {
        res.writeHead(code, {
            'Content-Type': 'text/plain'
        })
        switch (code) {
            case 400:
                res.end('400 Bad Request');
                break;
            case 403:
                res.end('403 Forbidden');
                break;
            case 404:
                res.end('404 Not Found');
                break;
            case 500:
                res.end('500 Internal Server Error');
                break;
        }
    })

    resEmitter.on('success', (code, filePath, stats) => {
        const readStream = fs.createReadStream(filePath)
        // 是否支持gzip压缩
        const ext = path.extname(filePath);
        const enableGzipFile = gzipTypes.test(ext)
        const enableGzipHeader = /gzip/i.test(req.headers['accept-encoding'])

        if(enableGzipFile && enableGzipHeader){
            res.setHeader('Content-Encoding', 'gzip')
            readStream.pipe(zlib.createGzip()).pipe(res)
        }else{
            readStream.pipe(res)
        }
        setHeaders(filePath, stats);
        res.writeHead(code)
    })

    // 只允许get请求方法
    if(req.method.toLowerCase() !== 'get'){
        console.warn('400 非法请求')
        resEmitter.emit('error', 400)
    }

    const originUrl = req.url
    const pathName = url.parse(originUrl).pathname

    // 默认展示相关文件夹内容
    if(pathName === '/'){
        fs.createReadStream(path.resolve(__dirname, './index.html')).pipe(res)
        return
    }

    // 单个文件请求
    getSingleFile(pathName).then(({code, filePath, stats}) => {
        resEmitter.emit('success', code, filePath, stats)
    }, error => {
        resEmitter.emit('error', error)
    })




    function getSingleFile(pathName){
        return new Promise((resolve, reject) => {
            const filePath = `${rootPath}${pathName}`  
            fs.stat(filePath, (err, stats) => {
                if(err){
                    // 常见的file system error https://nodejs.org/dist/latest-v10.x/docs/api/errors.html#errors_common_system_errors
                    if(err.code === 'ENOENT'){
                        return reject(404)
                    }else{
                        return reject(500)
                    }
                }else{
                    if(stats.isFile()){
                        const lastModified = stats.mtime.toUTCString()
                        if(req.headers['if-modified-since'] === lastModified){
                            return resolve({ code: 304, filePath, stats })
                        }else{
                            return resolve({ code: 200, filePath, stats })
                        }
                    }else{
                        console.log('403 禁止访问')
                        return reject(403)
                    }
                }
            })
        })
    
    }

    function setHeaders(filePath, stats){
        // 设置浏览器缓存过期事件
        const expires = new Date()
        expires.setTime(expires.getTime() + maxAge * 1000)
        res.setHeader('Expires', expires.toUTCString())
        res.setHeader('Cache-Control', `public max-age=${maxAge}`)
    
        // 设置上次修改时间
        const lastModified = stats.mtime.toUTCString()
        res.setHeader('Last-Modified', lastModified)
    
        // 设置size
        res.setHeader('Content-Length', stats.size)

        const ext = path.extname(filePath)
        res.setHeader('Content-Type', mime.getType(ext))
    }

}


