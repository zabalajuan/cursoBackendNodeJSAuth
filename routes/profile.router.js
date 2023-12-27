const express = require('express');

const passport = require('passport');

const OrderService = require('../services/order.service');

const router = express.Router();
const service = new OrderService();

router.get('/my-orders',
  //middleware 1
  //le indicamos que primero use esta estrategia de validacion,no queremos sesion
  passport.authenticate('jwt', {session: false}), //nos retorna el usuario si todo sale bien
  //middleware 2
  async (req, res, next) => {
    try {
        //el id del usuario estara en el JWT, en el sub
        const user = req.user;
        const orders = await service.findByUser(user.sub);
        res.json(orders)

    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;