"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Testimony extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Testimony.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.STRING(2000),
      image: DataTypes.TEXT('long'),
    },
    {
      sequelize,
      modelName: "Testimony",
      tableName: "Testimonials",
    }
  );
  return Testimony;
};
