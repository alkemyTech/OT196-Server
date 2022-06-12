"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.renameTable("categories", "Categories");
  },

  async down(queryInterface, Sequelize) {
    queryInterface.renameTable("Categories", "categories");
  },
};
