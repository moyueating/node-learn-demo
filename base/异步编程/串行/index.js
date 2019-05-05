const fs = require('fs')

// function readFile(path){
//    return function(...args){
//     fs.readFile(path, 'utf-8', function(err, data){
//         if(err) return err
//         const name = JSON.parse(data).name
//         console.log('args', args)
//         console.log('name', name)
//         next(null, args.push(name))
//     })
//    }
// }

// const jsonPath = `${process.cwd()}/json`
// // console.log(jsonPath)
// const dirs = fs.readdirSync(jsonPath)
// // console.log(dirs)

const absolulePath = `${process.cwd()}/json`
function first(){
    fs.readFile(`${absolulePath}/1.json`, 'utf-8', function(err, data){
        if(err) return err
        const name = JSON.parse(data).name
        next(null, name)
    })
}
function second(name){
    const realPath = `${absolulePath}/${name}`
    if(fs.existsSync(realPath)){
        fs.readFile(realPath, 'utf-8', function(err, data){
            if(err) return err
            const name = JSON.parse(data).name
            next(null, name)
        })
    }
}
function third(name){
    const realPath = `${absolulePath}/${name}`
    if(fs.existsSync(realPath)){
        fs.readFile(realPath, 'utf-8', function(err, data){
            if(err) return err
            const name = JSON.parse(data).name
            next(null, name)
        })
    }
}

function forth(name){
    const realPath = `${absolulePath}/${name}`
    if(fs.existsSync(realPath)){
        fs.readFile(realPath, 'utf-8', function(err, data){
            if(err) return err
            const name = JSON.parse(data).name
            next(null, name)
        })
    }
}


const tasks = [first, second, third, forth]

function next(err, result){
    if(err) return err

    const currentTask = tasks.shift()
    if(currentTask){
        console.log('result', result)
        currentTask(result)
    }
}

next()