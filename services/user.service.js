const boom = require('@hapi/boom');

const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    // const newUser = await models.User.create(data);
    //vamos a crear el usuario con el password pero como hash, entonces reasignamos los datos
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    //es importante no retornar el hash/password como resultado del query
    //opcion 1
    // delete newUser.password;
    //como estamos usando sequelize(ORM), debe ser
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
