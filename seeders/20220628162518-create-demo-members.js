"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "members",
      [
        {
          name: "Member Demo 1",
          image: "https://i.imgur.com/R0y6G9z.jpg?1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Member Demo 2",
          image: "https://i.imgur.com/XKuL0h8.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Member Demo 3",
          image: "https://i.imgur.com/RqI0wUE.jpg?1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
