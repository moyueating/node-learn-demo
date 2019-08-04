
function errorHandle(err, req, res, next){
    if(err) console.log(err)
    res.redirect('/404')
}

module.exports = errorHandle