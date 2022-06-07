'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameTable('Testimonials', 'Organizations', { transaction: t }),
        queryInterface.removeColumn('Organizations', 'lastName', { transaction: t }),
        queryInterface.removeColumn('Organizations', 'roleId', { transaction: t }),
        queryInterface.renameColumn('Organizations', 'firstName', 'name', { transaction: t })
      ]);
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Organizations');
  }
};
