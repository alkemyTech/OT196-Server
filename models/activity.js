'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {}
  };
  Activity.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.STRING(2500),
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Activity',
    tableName: 'Activities'
  });
  return Activity;
};