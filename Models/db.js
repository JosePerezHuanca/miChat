var mongoose=require('mongoose')

//se establece la conexion con mongodb
async function conectar(){
try{
await mongoose.connect('mongodb://localhost/miChat',{useNewUrlParser: true, useUnifiedTopology: true})
console.log('Conectado!');
}
catch(error){
console.log(`error: ${error.message}`)
}
}

//exporto la funcion conectar como atributo
module.exports.conectar=conectar