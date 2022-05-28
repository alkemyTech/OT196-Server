'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    static associate(models) {
    }
  }
  Entry.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING(2500),
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    type: {type: DataTypes.STRING, validate:{isIn: [['news', 'event', 'other']]}}
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Entry',
    tableName: 'Entries'
  });
  return Entry;
};