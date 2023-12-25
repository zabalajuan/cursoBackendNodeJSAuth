const express = require('express');

const passport = require('passport');

const router = express.Router();

router.post('/login',
  //middleware 1
  //le indicamos que primero use esta estrategia de validacion,no queremos sesion
  passport.authenticate('local', {session: false}), //nos retorna el usuario si todo sale bien
  //middleware 2
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
