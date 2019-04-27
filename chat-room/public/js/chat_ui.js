function divSystemContentElement(message, id) {
  return id ? $(`<div id=${id} />`).text(message) : $('<div />').text(message)
}


function processUserInput(chatApp, socket){
  const $msg = $('#messages')
  let message = $('#send-message').val()
  let systemMessage
  if(message.charAt(0) == '/'){
    chatApp.processCommand(message)

  }else{
    chatApp.sendMessage($('#room').text(), message)
    $msg.append(divSystemContentElement(message, 'me'))
    $msg.scrollTop($msg.prop('scrollHeight'))
    $('#send-message').val('')
  }
}