'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lecture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.lecture.belongsTo(models.course)
    }
  };
  lecture.init({
    title: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    time: DataTypes.STRING,
    courseId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lecture',
  });
  return lecture;
};