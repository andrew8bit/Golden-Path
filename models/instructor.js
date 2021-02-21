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
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
          args: [1,36],
          msg: 'Username must be between 1 and 36 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "instructor"
    },
    img: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,36],
          msg: 'Password must be between 8 and 36 characters'
        }
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthday: DataTypes.STRING,
    location: DataTypes.STRING,
    about: DataTypes.STRING,
    courseId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'instructor',
  });

  instructor.addHook('beforeCreate', (pendingInstructor) => {
    let hash = bcrypt.hashSync(pendingInstructor.password, 12);
    pendingInstructor.password = hash;
  });

  instructor.prototype.validPassword = function(typedPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password);
    return isCorrectPassword;
  }
  instructor.prototype.toJSON = function() {
    let instructorData = this.get();
    delete instructorData.password;
    return instructorData;
  }
  return instructor;
};