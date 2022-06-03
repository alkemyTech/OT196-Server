'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {}
  };
  category.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING(2500),
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'category',
    tableName: 'categories'
  });
  return category;
};