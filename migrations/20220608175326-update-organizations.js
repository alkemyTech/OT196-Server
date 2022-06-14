'use strict';
// Add social networks to organizatiosn table
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Organizations', 'instagram', Sequelize.STRING, { transaction: t }),
        queryInterface.addColumn('Organizations', 'twitter', Sequelize.STRING, { transaction: t }),
        queryInterface.addColumn('Organizations', 'whatsapp', Sequelize.STRING, { transaction: t }),
        queryInterface.addColumn('Organizations', 'facebook', Sequelize.STRING, { transaction: t })
      ]);
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Organizations', 'instagram', Sequelize.STRING, { transaction: t }),
        queryInterface.removeColumn('Organizations', 'twitter', Sequelize.STRING, { transaction: t }),
        queryInterface.removeColumn('Organizations', 'whatsapp', Sequelize.STRING, { transaction: t }),
        queryInterface.removeColumn('Organizations', 'facebook', Sequelize.STRING, { transaction: t })
      ]);
    });
  }
};
