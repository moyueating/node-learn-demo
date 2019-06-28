const { exec, execFile } = require('child_process');

// exec('git clone git@github.com:moyueating/canvas-demo.git', (err, stdout, strerr) => {
//     console.log(err)
//     console.log('stdout', stdout)
//     console.log('strerr', strerr)
// })

// exec('ls', (err, stdout, strerr) => {
//     console.log(err)
//     console.log('stdout', stdout)
//     console.log('strerr', strerr)
// })

exec('touch test.css', (err, stdout, strerr) => {
    console.log(err)
    console.log('stdout', stdout)
    console.log('strerr', strerr)
})

