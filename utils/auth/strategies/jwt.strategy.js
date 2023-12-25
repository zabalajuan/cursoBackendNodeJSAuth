const {Strategy, ExtractJwt} =  require( 'passport-jwt');

const {config} = require('./../../../config/config');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret

}

//como parametro recibe las opciones, y nos responde el payload
const JwtStrategy = new Strategy(options, (payload, done) => {
    //la estrategia automoticamente con las opciones dadas, verifica el header con el secreto nuestro
    return done(null, payload);
})

module.exports = JwtStrategy;