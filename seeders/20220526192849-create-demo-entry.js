'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Entries', [{
      name: 'Taller de Emprendedores',
      content: 'Continúa el taller para emprendedores sobre exhibición de productos. Continúa realizándose el Taller “Formas creativas de exhibir los productos”, del cual participan veinte emprendedores. El mismo apunta a la formación y capacitación en herramientas de diseño y comunicación para mejorar la exhibición y promoción de los productos en el espacio de venta.      El taller está enmarcado en el Ciclo de Capacitaciones para Emprendedores de la Economía Social que impulsa Sol de Mayo. A lo largo de 8 encuentros los emprendedores trabajan en la implementación de metodologías de exhibición de acuerdo a las particularidades y necesidades de los productos que elaboran. Incorporando conocimientos básicos estético-visuales para mejorar la exhibición de los productos en el stand de cada emprendedor: color, textura, planos, iluminación, tamaño, alturas, composición del espacio. Como resultado de la experiencia se diseñará un sand de venta que sea funcional al tproducto, desarmable y trasportable.',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      categoryId: 1,
      type: 'event',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Taller de Santi',
      content: 'Continúa el taller para emprendedores sobre exhibición de productos. Continúa realizándose el Taller “Formas creativas de exhibir los productos”, del cual participan veinte emprendedores. El mismo apunta a la formación y capacitación en herramientas de diseño y comunicación para mejorar la exhibición y promoción de los productos en el espacio de venta.      El taller está enmarcado en el Ciclo de Capacitaciones para Emprendedores de la Economía Social que impulsa Sol de Mayo. A lo largo de 8 encuentros los emprendedores trabajan en la implementación de metodologías de exhibición de acuerdo a las particularidades y necesidades de los productos que elaboran. Incorporando conocimientos básicos estético-visuales para mejorar la exhibición de los productos en el stand de cada emprendedor: color, textura, planos, iluminación, tamaño, alturas, composición del espacio. Como resultado de la experiencia se diseñará un sand de venta que sea funcional al tproducto, desarmable y trasportable.',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      categoryId: 2,
      type: 'news',
      createdAt: new Date,
      updatedAt: new Date
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *s
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
