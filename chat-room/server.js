const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const chatServer = require('./lib/chat_server')

// 缓存文件内容对象
const cache = {}

function send404(res){
  res.writeHead(404, {
    'Content-Type': 'text/plain'
  })
  res.write('Error 404: resource not found')
  res.end()
}

function sendFile(res, filePath, fileContents){
  res.writeHead(200, {
    'Content-Type': mime.getType(path.basename(filePath))
  })
  res.end(fileContents)
}

function serverStatic(res, cache, absPath){
  if(cache[absPath]){
    sendFile(res, absPath, cache[absPath])
  }else{
    fs.exists(absPath, exists => {
      if(exists){
        fs.readFile(absPath, (err, data) => {
          if(err){
            return send404(res)
          }
          cache[absPath] = data
          sendFile(res, absPath, data)
        })
      }else{
        send404(res)
      }
    })
  }
}

const server = http.createServer((req, res) => {
  let filePath = ''

  console.log(req.url)
  if(req.url == '/'){
    filePath = 'public/index.html'
  }else{
    filePath = `public/${req.url}`
  }

  const absPath = `./${filePath}`
  serverStatic(res, cache, absPath)
})

chatServer(server)

server.listen(3000, () => {
  console.log('Server is listening port 3000.')
})