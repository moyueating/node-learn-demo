// 通过维护计数器来实现并行流程控制
const fs = require('fs')
let count = 0
let tasks = [a,b,c]

function checkComplete(){
  if(count == tasks.length){
      console.log('all tasks are completed')
  }
}

function a(){
    setTimeout(function(){
        fs.readFile('./json/1.json', 'utf-8', function(err, data){
            count++
            console.log('a is completed')
            // console.log(JSON.parse(data).name)
            checkComplete()
        })
    },1000)
}

function b(){
    setTimeout(function(){
        fs.readFile('./json/2.json', 'utf-8', function(err, data){
            count++
            console.log('b is completed')
            // console.log(JSON.parse(data).name)
            checkComplete()
            let last = +new Date()
            console.log('三个任务共耗时：', last - now)
        })
    },1500)
}

function c(){
    setTimeout(function(){
        fs.readFile('./json/3.json', 'utf-8', function(err, data){
            count++
            console.log('c is completed')
            // console.log(JSON.parse(data).name)
            checkComplete()
        })
    },500)
}

const now = +new Date()
tasks.forEach(task => {
    task()
})


