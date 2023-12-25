const bcrypt = require('bcrypt');

//es un metodo asincrono
async function hashPassword(){
    
    //vamos a recibir un password de nuestros clientes
    const myPassword = 'admin 123 123.';
    //a la funcion debemos enviarle la clave, y cuantas veces va a hacer el encryptado, cuantos saltos
    const hash = await bcrypt.hash(myPassword, 10);
    console.log(hash);
}

hashPassword();