'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsToMany(models.course, {through :"usersCourses"})
    }
  };
  user.init({
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
      defaultValue: "student"
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
    modelName: 'user',
  });
  
  user.addHook('beforeCreate', (pendingUser) => {
    let hash = bcrypt.hashSync(pendingUser.password, 12);
    pendingUser.password = hash;
  });

  user.prototype.validPassword = function(typedPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password);

    return isCorrectPassword;
  }

  user.prototype.toJSON = function() {
    let userData = this.get();
    delete userData.password;

    return userData;
  }
  return user;
};