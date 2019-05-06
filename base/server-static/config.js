const path = require('path')

module.exports = {
    port: '3333',
    rootPath: path.resolve(__dirname, './asserts'),
    maxAge: 7200, // 单位秒
    /**
     * gzip压缩文件的类型
     */
    gzipTypes: /js|css|html?/i
}