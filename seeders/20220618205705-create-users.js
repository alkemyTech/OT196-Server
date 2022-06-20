'use strict';

const bcrypt = require('bcrypt');
const USERS_LIST = [
  { firstName: 'Usuario', lastName: 'Normal', roleId: 1 },
  { firstName: 'Usuario', lastName: 'Admin', roleId: 2 },
  { firstName: 'Juan', lastName: 'Rodriguez', roleId: 2 },
  { firstName: 'Gerardo', lastName: 'Fernandez', roleId: 2 },
  { firstName: 'Carlos', lastName: 'Gutierrez', roleId: 2 },
  { firstName: 'Sebastian', lastName: 'Mendoza', roleId: 2 },
  { firstName: 'Facundo', lastName: 'Olmedo', roleId: 1 },
  { firstName: 'Santiago', lastName: 'Perez', roleId: 2 },
  { firstName: 'Martin', lastName: 'Sanchez', roleId: 2 },
  { firstName: 'Julian', lastName: 'Romero', roleId: 2 },
  { firstName: 'Ezequiel', lastName: 'Almada', roleId: 1 },
  { firstName: 'Micaela', lastName: 'Torres', roleId: 1 },
  { firstName: 'Cecilia', lastName: 'Sosa', roleId: 2 },
  { firstName: 'Carla', lastName: 'Ramirez', roleId: 2 },
  { firstName: 'Fernanda', lastName: 'Ruiz', roleId: 2 },
  { firstName: 'Sofia', lastName: 'Medina', roleId: 2 },
  { firstName: 'Ludmila', lastName: 'Flores', roleId: 2 },
  { firstName: 'Martina', lastName: 'Benitez', roleId: 2 },
  { firstName: 'Esmeralda', lastName: 'Herrera', roleId: 2 },
  { firstName: 'Valentina', lastName: 'Aguirre', roleId: 1 },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', USERS_LIST.map(
      (e) => {
        e.createdAt = new Date
        e.updatedAt = new Date
        e.password = bcrypt.hashSync((e.lastName).toLowerCase(), 10)
        e.email = (e.firstName + e.lastName).toLowerCase() + '@mail.com'
        e.image = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
        return e
      }), {});
  },

  down: async (queryInterface, Sequelize) => {
  }
};
