const boom = require('@hapi/boom');

const {config} = require('./../config/config');

//creamos el middleware
function checkApiKey(req, res, next){
    //de los headers extraeremos la api
    const apiKey = req.headers['api'];
    if (apiKey === config.apiKey){
        next();
    }else {
        //ejecutamos un middleware de tipo error
        next(boom.unauthorized());
    }

};

//middleware
function checkAdminRole(req, res, next){
    console.log(req.user);
    //el user que nos llega, va a venir con un payload asociado, en ese payload esta el role del mismo
    const user = req.user;
    if(user.role === 'admin'){
        next(); //si el rol esta aprobado, le damos paso
    } else {
        next(boom.unauthorized());
    }
}

//para no tener una autenticación por rol, haremos esta funcion
//Usando Closures - estamos recibiendo los roles
function checkRoles(...roles){
    
    //vamos a retornar un middleware
    return (req, res, next) => {
        
        const user = req.user;
        if(roles.includes(user.role)) { //como recibiremos un array de roles, validamos si el del usuario esta incluido
            next(); //si el rol esta aprobado, le damos paso
        } else {
            next(boom.unauthorized());
        }
    }
}

module.exports = {checkApiKey, checkAdminRole, checkRoles};