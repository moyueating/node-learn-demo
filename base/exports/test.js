function say(){
    console.log('hello')
}
function read(){
    console.log('read')
}

// exports.say = say
// exports.read = read

// console.log(module.exports)
// console.log(exports)
// module.exports = say
// module.exports = read
module.exports = {say, read}