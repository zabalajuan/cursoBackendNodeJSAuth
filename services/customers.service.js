const boom = require('@hapi/boom');

const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    //ahora vamos a hacer una clonación de data, con el password como hash
    const newData = {
      ...data,
      user:{ //también clonamos la informacion del usuario
        ...data.user,
        password: hash  //solo etsamos cambiando el hash
      }

    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = CustomerService;
