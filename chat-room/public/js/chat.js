class Chat {
  constructor(socket){
    this.socket = socket
  }

  sendMessage = (room, text) => {
    const message = {
      room,
      text
    }
    this.socket.emit('message', message)
  }

  changeRoom = (room) => {
    this.socket.emit('join', {
      newRoom: room
    })
  }

  processCommand = (command) => {
    console.log(command)
    let words = command.split(' ')
    let type = words[0].substring(1).toLowerCase()
    let name = command.replace(`/${type} `, '')
    let message = ''
    switch (type) {
      case 'join':
        this.changeRoom(name)
        break;
      case 'nick':
        // let name = command.replace('/nick ', '')
        // this.socket.emit()
        break;

      case 'join':

        break;
    
      default:
        break;
    }
    return message
  }
}