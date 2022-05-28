"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Testimonials",
      [
        {
          firstName: "Testimonio 1",
          lastName: "Demo",
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          phone: 123456,
          address: "Demo Address 1234",
          welcomeText: "Welcome Demo",
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
