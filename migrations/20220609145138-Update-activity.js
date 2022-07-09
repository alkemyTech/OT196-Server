"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Activities", "content", {
      type: Sequelize.STRING(2500),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Activities", "content", {
      type: Sequelize.STRING(2500),
    });
  },
};
