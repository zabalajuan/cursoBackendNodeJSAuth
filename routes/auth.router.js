const express = require('express');

const passport = require('passport');

const jwt = require('jsonwebtoken');

const {config} = require( './../config/config');

const router = express.Router();

router.post('/login',
  //middleware 1
  //le indicamos que primero use esta estrategia de validacion,no queremos sesion
  passport.authenticate('local', {session: false}), //nos retorna el usuario si todo sale bien
  //middleware 2
  async (req, res, next) => {
    try {
      const user = req.user; //adquirimos los datos del usuario que se verificó
      const payload = {
        sub: user.id,
        role: user.role
      }


      const token = jwt.sign(payload, config.jwtSecret); 
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
