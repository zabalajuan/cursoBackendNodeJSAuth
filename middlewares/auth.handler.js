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

module.exports = {checkApiKey};