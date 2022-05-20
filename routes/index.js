var passport=require('passport');
var express = require('express');
var router = express.Router();
var home=require('../Controllers/HomeController');
/* GET home page. */

router.get('/', home.index)
router.get('/cargar',home.cargarV)
router.post('/cargar', home.cargar)
router.get('/login',home.loginV)
router.post('/login', passport.authenticate("local",{successRedirect: "/chat", failureRedirect: "/login"}), home.login)
router.get('/chat', logueado, home.chat)
router.get('/logout', home.logout)

function logueado(req,res,next){
if(req.isAuthenticated()){
return next();
}
res.redirect('/login');
}

module.exports = router;
