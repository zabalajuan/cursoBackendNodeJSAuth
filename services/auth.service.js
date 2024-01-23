
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

    async sendMail(email) {
        //primero vamos a validar si tenemos el usuario
        const user = await service.findByEmail(email);
        if(!user){
            throw boom.unauthorized();
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure:true, //true for 465, false for other ports
            port: 465,
            auth: {
                user: config.smtpEmail,
                pass: config.smtp_password
            }
        });

        await transporter.sendMail({
            from: '"Fred Foo" <zabala1juan@gmail.com>',
            to: `${user.email}`,  //list of receivers
            subject: "Hello desde mi app de NodeJs", //Subject Line
            text: "Hello Mundo!",   //plain text body
            html: "<b>Hola world?</b>", //html body 
        })

        return {message: 'mail sent'};

    }


}

module.exports = AuthService;