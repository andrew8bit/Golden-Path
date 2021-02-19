'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.payment.belongsTo(models.user)
      models.payment.belongsTo(models.instructor)
    }
  };
  payment.init({
    cardNumber: DataTypes.INTEGER,
    carrier: DataTypes.STRING,
    expiration: DataTypes.STRING,
    cvc: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    instructorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};