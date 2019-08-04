let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let errorHandle = require('./middlewares/error')
let redirectHandle = require('./middlewares/redirect')

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let _404 = require('./routes/404')
let entries = require('./routes/entries')

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 中间件


// 路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/404', _404)

app.get('/post', entries.form)
app.post('/post', entries.submit)


app.use(errorHandle);

module.exports = app;
