let Entry = require('../models/entry')

exports.form = (req, res) => {
    res.render('post', {
        title: 'Post'
     })
}

exports.submit = (req, res, next) => {
    const data = req.body.entry
    const user = res.locals.user
    const username = user ? user.name : null
    const entry = new Entry({
        username,
        title,
        body: data.body
    })
    console.log(data)
}