const db = require("./models");

/******************************/
// user({
//     username: DataTypes.STRING,
//     img: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     phoneNumber: DataTypes.STRING,
//     birthay: DataTypes.STRING,
//     location: DataTypes.STRING,
//     courseId: DataTypes.INTEGER
//   })

db.user.findOrCreate({
  where: {

  },
});

/******************************/
// instructor.init({
//     username: DataTypes.STRING,
//     img: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     phoneNumber: DataTypes.STRING,
//     birthday: DataTypes.STRING,
//     location: DataTypes.STRING
//   }

db.instructor.findOrCreate({
  where: {

  },
});

/******************************/
// category.init({
//     name: DataTypes.STRING
//   }, {

db.category.findOrCreate({
    where: {

    },
});

/******************************/
// subCategory.init({
// name: DataTypes.STRING,
// categoryId: DataTypes.INTEGER
// },

db.subCategory.findOrCreate({
    where: {

    },
  });
/******************************/
// course.init({
//     name: DataTypes.STRING,
//     img: DataTypes.STRING,
//     time: DataTypes.STRING,
//     difficulty: DataTypes.STRING,
//     description: DataTypes.STRING,
//     categoryId: DataTypes.INTEGER,
//     subCategoryId: DataTypes.INTEGER,
//     instructorId: DataTypes.INTEGER
//     },

db.course.findOrCreate({
    where: {

    },
  });
/******************************/
//   usersCourses.init({
//     userId: DataTypes.INTEGER,
//     courseId: DataTypes.INTEGER
//   },

db.usersCourses.findOrCreate({
    where: {

    },
  });
/******************************/
// lecture.init({
//     title: DataTypes.STRING,
//     difficulty: DataTypes.STRING,
//     time: DataTypes.STRING,
//     courseId: DataTypes.INTEGER,
//     content: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'lecture',
//   })

db.lecture.findOrCreate({
    where: {

    },
  });

/******************************/
//   payment.init({
//     cardNumber: DataTypes.INTEGER,
//     carrier: DataTypes.STRING,
//     expiration: DataTypes.STRING,
//     cvc: DataTypes.INTEGER,
//     userId: DataTypes.INTEGER,
//     instructorId: DataTypes.INTEGER
//   },

db.payment.findOrCreate({
    where: {
        
    },
  });