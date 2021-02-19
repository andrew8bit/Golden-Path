'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.course.belongsToMany(models.user, {thought: "usersCourses"})
      models.course.belongsTo(models.instructor)
      models.course.belongsTo(models.category)
      models.course.belongsTo(models.subCategory)
      models.course.hasMany(models.lecture)
    }
  };
  course.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    time: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    description: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    instructorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};