'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  location.init({
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'location',
  });
  return location;
};