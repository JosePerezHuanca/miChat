var passport=require('passport');

var User=require('../Models/user')

var index=(req,res)=>{
    res.render('index');
}

var cargarV=(req,res)=>{
    res.render('Cargar');
}

var cargar=(req,res)=>{
User.register(new User({username: req.body.username}),req.body.password, function(err,user){
   if(err){
       console.log(err);
       return res.render('Cargar');
   } 
   passport.authenticate("local")
   (req,res,function(){
       res.redirect('/chat');
   });
})
}

var loginV=(req,res)=>{
res.render('login');
}

var login=(req,res)=>{

}

var chat=(req,res)=>{
    res.render('chat',{elUser: req.user});
}

var logout=(req,res)=>{
    req.logout();
    res.redirect('/');
}


module.exports.index=index;
module.exports.cargarV=cargarV;
module.exports.cargar=cargar;
module.exports.loginV=loginV;
module.exports.login=login;
module.exports.chat=chat;
module.exports.logout=logout;
