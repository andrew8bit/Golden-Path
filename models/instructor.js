'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class instructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.instructor.hasMany(models.course)
    }
  };
  instructor.init({
    username: DataTypes.STRING,
    img: DataTypes.STRING,
    tag: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthday: DataTypes.STRING,
    location: DataTypes.STRING,
    about: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'instructor',
  });
  return instructor;
};