### module.exports和exports
两者默认都是空对象
```js
console.log(exports) // {}
console.log(module.exports) // {}
```

### module.exports
具体导出单个模块
```js
    // index.js
    const test = require('./test') 
    console.log(test) // {read: [Function: read]}
```
```js
    // test.js
    module.exports.say = function(){console.log('hello')}
    module.exports.read = function(){console.log('read')} // 后者覆盖前者
    module.exports = {
        say,
        read
    }
```

### exports
当在一个模块中导出多个模块时可以使用，exports导出模块的时候如下:

```js
    // index.js
    const test = require('./test') 
    console.log(test) // {say: [Funciton: say], read: [Function: read]}
```
```js
    // test.js
    exports.say = function(){console.log('hello')}
    exports.read = function(){console.log('read')}
```