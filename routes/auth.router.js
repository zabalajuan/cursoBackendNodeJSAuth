const express = require('express');

const passport = require('passport');

// const jwt = require('jsonwebtoken');

// const {config} = require( './../config/config');

const AuthService = require('./../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post('/login',
  //middleware 1
  //le indicamos que primero use esta estrategia de validacion,no queremos sesion
  passport.authenticate('local', {session: false}), //nos retorna el usuario si todo sale bien
  //middleware 2
  async (req, res, next) => {
    try {
      // const user = req.user; //adquirimos los datos del usuario que se verificó
      // const payload = {
      //   sub: user.id,
      //   role: user.role
      // }


      // const token = jwt.sign(payload, config.jwtSecret); 
      // res.json({
      //   user,
      //   token
      // });

      const user = req.user;
      res.json(service.signToken(user));

    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  

//middleware 1
  async (req, res, next) => {
    try {
      const {email} = req.body; //adquirimos los datos del usuario, el correo en este caso
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
//middleware 1
  async (req, res, next) => {
    //deberamos tener una capa para la validacin de los datos
    try {
      const {token, newPassword} = req.body; //adquirimos los datos del usuario, el correo en este caso
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
