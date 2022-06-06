"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Organizations",
      [
        {
          name: "Somos Más",
          image: "http://onginfanciadenad.org/wp-content/uploads/2022/02/ICONO-ACCION-SOCIAL_ONG-3.png",
          phone: "1160112988",
          address: "Av. Siempreviva 742",
          welcomeText: "Desde 1997 en Somos Más trabajamos con los chicos y chicas, mamás y papás, abuelos y vecinos del barrio La Cava generando procesos de crecimiento y de inserción social.",
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
