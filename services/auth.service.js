
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');

const { config } = require('./../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {

    async getUser(email, password) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user;
    }

    //recibimos como parametro el usuario que esta autenticado
    signToken(user) {
        
        const payload = {
            sub: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwtSecret);
        return {
            user,
            token
        }
    };

    async sendRecovery(email){
        //primero vamos a validar si tenemos el usuario
        const user = await service.findByEmail(email);
        if(!user){
            throw boom.unauthorized();
        }
        //vamos a generar un token (jwt) para poder generar el link de recuperar contraseña

        const payload ={sub: user.id}
        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
        //aqui estariamos llevando al usuario a la pagina donde va a recuperar contraseñá
        const link = `http://myfrontend.com/recovery?token=${token}`;
        await service.update(user.id, {recoveryToken: token});  //guardamos el token del usuario en la base de datos


        const mail = {
            from: config.smtpEmail,
            to: `${user.email}`,  //list of receivers
            subject: "Email para recuperar contraseña", //Subject Line
            // text: "Hello Mundo!",   //plain text body
            html: `<b>Ingresa a este link => ${link}</b>`, //html body 
        }
        const rta = await this.sendMail(mail);
        return rta;
    }

    async changePassword(token, newPassword){
        try{
            //debemos verificar el token, cada vez que verificamos, el nos devuelve el payload
            const payload = jwt.verify(token, config.jwtSecret);
            const user = await service.findOne(payload.sub);    //validamos si el usuario existe o no
            if (user.recoveryToken !== token){
                //si el token es valido, pero es diferente al guardado en la base de datos
                throw boom.unauthorized();
            }
            //debemos hacer un hash d ela contraseña
            const hash = await bcrypt.hash(newPassword, 10);
            //ahora si actualizamos los datos del usuario en la base de datos
            await service.update(user.id, {recoveryToken: null, password: hash} )
            return {message: 'password updated'}
        } catch (error){
            throw boom.unauthorized()
        }
    };

    async sendMail(infoMail) {
        //primero vamos a validar si tenemos el usuario
        // const user = await service.findByEmail(email);
        // if(!user){
        //     throw boom.unauthorized();
        // }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure:true, //true for 465, false for other ports
            port: 465,
            auth: {
                user: config.smtpEmail,
                pass: config.smtp_password
            }
        });

        // await transporter.sendMail({
        //     from: '"Fred Foo" <zabala1juan@gmail.com>',
        //     to: `${user.email}`,  //list of receivers
        //     subject: "Hello desde mi app de NodeJs", //Subject Line
        //     text: "Hello Mundo!",   //plain text body
        //     html: "<b>Hola world?</b>", //html body 
        // })
        await transporter.sendMail(infoMail);
        return {message: 'mail sent'};

    }


}

module.exports = AuthService;