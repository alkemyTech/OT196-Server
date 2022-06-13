"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {}
  }
  Category.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING(2500),
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Category",
      tableName: "Categories",
    }
  );
  return Category;
};
