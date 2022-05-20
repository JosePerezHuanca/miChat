var mongoose=require('mongoose');
var passportLocalMongoose=require('passport-local-mongoose');

//accedo al metodo schema donde defino la estructura del documento
const userSchema=mongoose.Schema({
    username: String,
    password:String
})

userSchema.plugin(passportLocalMongoose);
const UserModel=mongoose.model('user',userSchema);


module.exports=UserModel;