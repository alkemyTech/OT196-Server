'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slides extends Model {
  };
  
  Slides.init({
    imageUrl: DataTypes.STRING,
    text: DataTypes.STRING,
    order: DataTypes.STRING,
    organizationId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Slides',
  });
  return Slides;
};