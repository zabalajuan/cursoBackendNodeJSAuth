const jwt = require('jsonwebtoken');

//el secreto debería ser una variable de ambiente, solo el backend la debe conocer
const secret = 'miSecreto';

//es la carga que vamos a encriptar en el token
const payload = {
    //subject es parte del estandar, como vamos a identificar al usuario
    sub: 1,
    role: 'customer'
}

function signToken(payload, secret){
    return jwt.sign(payload, secret);    
}

const token = signToken(payload, secret);
console.log(token); //al ejecutar vemos que tenemos un token con las tres partes header.payload.firma
