const socketio = require('socket.io')
let io
let guestNumber = 1
let nickNames = {}
let namesUsed = []
let currentRoom = {}

function assignGuestName(socket, guestNumber, nickNames, namesUsed){
  console.log(guestNumber)
  const name = `Guest ${guestNumber}`
  nickNames[socket.id] = name
  socket.emit('nameResult', {
    success: true,
    name,
  })
  namesUsed.push(name)
  return guestNumber + 1
}

function handleMessageBroadcasting(socket){
  socket.on('message', message => {
    console.log('handleMessageBroadcasting', message)

    socket.broadcast.to(message.room).emit('message', {
      text: `${nickNames[socket.id]}: ${message.text}`
    })
  })
}

function joinRoom(socket, room){
  socket.join(room)
  currentRoom[socket.id] = room
  socket.emit('joinResult', {
    room
  })
  socket.broadcast.to(room).emit('tip', {
    text: `${nickNames[socket.id]} has joined room .`
  })

  // 获取当前房间里的用户
  io.clients((err, clients) => {
    let usersInRoomSummsary
    if(clients.length > 1){
      usersInRoomSummsary = clients.reduce(function(pre, current, index){
        return pre + nickNames[current] + (index<clients.length-1 ? '，' : '')
      }, '当前房间有')
    }
    socket.emit('tip', {
      text: usersInRoomSummsary
    })
  })
}

function handleNameChangeAttempts(){

}

function handleClientDisconnection(socket){
  socket.on('disconnect',() => {
    console.log('disconnect')
    let nameIndex = namesUsed.indexOf(nickNames[socket.id])
    namesUsed.splice(nameIndex, 1)
    Reflect.deleteProperty(nickNames, socket.id)
  })
}

function handleRoomJoining(socket){
  socket.on('join', room => {
    socket.leave(currentRoom[socket.id])
    joinRoom(socket, room.newRoom)
  })
}


module.exports = function(server){
  io = socketio.listen(server)
  io.set('log level', 1)

  io.on('connection', socket => {
    // 用户连接后赋予一个访客名
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed)
    // 在其他用户连接上后把他放入聊天室Lobby里面
    joinRoom(socket, '聊天室1')
    
    // 处理用户的消息，改名，以及聊天室的创建和变更
    handleMessageBroadcasting(socket, nickNames)

    // 改名
    // handleNameChangeAttempts(socket, nickNames, namesUsed)

    // 聊天室创建和变更
    handleRoomJoining(socket)

    // 用户发出请求时，向其提供已经被占用的聊天室的列表
    socket.on('rooms', () => {
      // console.log('socket.rooms', socket.rooms)
      console.log('rooms', Object.keys(socket.rooms))
      let rooms = Object.keys(socket.rooms).splice(1)
      console.log(rooms)
      socket.emit('rooms', rooms)
    })

    // 定义用户断开连接后的清除逻辑
    handleClientDisconnection(socket, nickNames, namesUsed)

  })
}