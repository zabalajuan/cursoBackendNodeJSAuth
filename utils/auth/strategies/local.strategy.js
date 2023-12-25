const {Strategy} =  require( 'passport-local');

const boom = require('@hapi/boom');

const bcrypt = require('bcrypt');

const UserService = require('./../../../services/user.service');

//para utilizar el servicio, creamos una instancia del mismo
const service = new UserService();

//generamos una instancia d ela estrategia usando el metodo constructor
//lo que nos retorna esta estrategia son esos 3 parametros
const LocalStrategy =  new Strategy({
    usernameField: 'email',
    passwordField: 'password'

    },  
    async (email, password, done) =>{
        try{
            const user = await service.findByEmail(email);  //en este caso el usernae es el email
            if (!user) {
                done(boom.unauthorized(), false)    //asi enviamos el error si no encontramos un usuario
            }
            //si si encontró el usuario, tenemos el usuario pero con hash
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                // si la contraseña no coincide
                done(boom.unauthorized(), false) 
            }
            //si todo salió bien
            delete user.dataValues.password;
            done(null, user);
        
        }catch(error){
            done(error, false); //si algo sale mal, enviamos el error y le decinos que no fue posible hacer la validacion
        }
    
    }
);

module.exports = LocalStrategy;