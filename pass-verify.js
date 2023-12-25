const bcrypt = require('bcrypt');

//es un metodo asincrono
async function verifyPassword(){
    
    //vamos a recibir un password de nuestros clientes
    const myPassword = 'admin 123 123.';
    const hash = '$2b$10$2rSCzd/g1O3utE0oKkH9K.3ZnedyNn.7fmf.JGc0puF790SNafaCK';
    //a la funcion debemos enviarle la clave, y el hash que tenemos de la encriptación
    const isMatch = await bcrypt.compare(myPassword, hash);
    console.log(isMatch);
}

verifyPassword();