'use strict';

module.exports = {
   async up (queryInterface, Sequelize)  {
    await queryInterface.bulkInsert('Activities', [{
      name: 'Taller de Emprendedores',
      content: 'Continúa el taller para emprendedores sobre exhibición de productos.',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,      
      updatedAt: new Date
    }], {});
  },


   async down (queryInterface, Sequelize)  {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
