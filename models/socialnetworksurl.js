'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialNetworksURL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SocialNetworksURL.init({
    Facebook: DataTypes.STRING,
    Linkedin: DataTypes.STRING,
    Instagram: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SocialNetworksURL',
  });
  return SocialNetworksURL;
};