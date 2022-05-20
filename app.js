var createError = require('http-errors');
var express = require('express');
var session=require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose')
var passport=require('passport')
var LocalStrategy=require('passport-local')
var passportLocalMongoose=require('passport-local-mongoose')
var User=require('./Models/user')
var db=require('./Models/db')

var indexRouter = require('./routes/index');
db.conectar();


var app = express();
var http=require('http')
var httpServer=http.Server(app);
var { Server }=require('socket.io');
var io= new Server(httpServer);

var mensajes=[
  {autor: 'admin', text: 'Hola!'}
]

io.on('connection', socket =>{
console.log('Socket conectado!');
socket.emit('messages', mensajes);
socket.on('new-message', mensaje=>{
mensajes.push(mensaje);
io.sockets.emit('messages', mensajes);
})

})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: '123456', resave: true, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  const PORT = process.env.PORT || 3000
  httpServer.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))

module.exports = app;
