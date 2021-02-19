const db = require("./models");
const seperator = "*******************************************************"

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
//     about: DataTypes.STRING,
//     courseId: DataTypes.INTEGER
//   })

// db.user.findOrCreate({
//   where: { 
//     username: "User001",
//     email: "GoldenPathUser01@gmail.com",
//     password: "Password123",
//     firstName: "Golden",
//     lastName: "Path",
//     phoneNumber: "0123456789",
//     birthday: "01/22/1997",
//     location: "USA",
//   }
// }).then(([newUser, created])  => {
//   console.log(seperator)
//   console.log(newUser)
// })

// const createUser = (email, password) => {
//   db.user.findOrCreate({
//     where: {
//       email: email,
//       password: password
//     }
//   }).then(function ([user, created]){
//     console.log(user)
//   })
// }

// createUser("GPtestuser01@gmail.com", "Password123");
// createUser("GPtestuser02@gmail.com", "Password456");
// createUser("GPtestuser03@gmail.com", "Password890");

// const updateUser = (userId, username, img, firstName, lastName, phoneNumber, birthday, location, about) => {
//   db.user.update({
//     username: username,
//     img: img,
//     firstName: firstName,
//     lastName: lastName,
//     phoneNumber: phoneNumber,
//     birthday: birthday,
//     location: location,
//     about: about,
//   }, { 
//     where: {
//     id: userId
//     }
//   }).then(function (user) {
//     console.log(user)
//   })
// }

// updateUser(1, "GPUSER", "Golden", "Path", "3423432", "01/22/1997", "USA", "testing about")
// updateUser(2, "GPUSER", "Golden", "Path", "3423432", "01/22/1997", "USA", "testing about")
// updateUser(3, "GPUSER", "Golden", "Path", "3423432", "01/22/1997", "USA", "testing about")

// const createInstructor = (email, password) => {
//   db.instructor.findOrCreate({
//     where: {
//       email: email,
//       password: password
//     }
//   }).then(function ([instructor, created]){
//     console.log(instructor)
//   })
// }

// const updateInstructor = (userId, username, tag, firstName, lastName, phoneNumber, birthday, location, about) => {
//   db.instructor.update({
//     username: username,
//     tag:tag,
//     firstName: firstName,
//     lastName: lastName,
//     phoneNumber: phoneNumber,
//     birthday: birthday,
//     location: location,
//     about: about,
//   }, { 
//     where: {
//     id: userId
//     }
//   }).then(function (user) {
//     console.log(user)
//   })
// }

const deleteInstructor = (instructorId) => {
  db.instructor.destroy({
    where: {
      id: instructorId
    }
  })
}
const deleteUser = (userId) => {
  db.user.destroy({
    where: {
      id: userId
    }
  })
}


// createInstructor("GPtestInstructor01@gmail.com", "Password123");
// createInstructor("GPtestInstructor02@gmail.com", "Password456");
// createInstructor("GPtestInstructor03@gmail.com", "Password890");


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

// db.instructor.findOrCreate({
//   where: { 
//     username: "GPAdmin",
//     email: "GoldenPath@gmail.com",
//     password: "GPassword123",
//     firstName: "Golden",
//     lastName: "Path",
//     phoneNumber: "0123456789",
//     birthday: "01/01/2021",
//     location: "USA",
//   }
// }).then(([newInstructor, created])  => {
//   console.log(seperator)
//   console.log(newInstructor)
// })

/******************************/
// category.init({
//     name: DataTypes.STRING
//   }, {

// Adding a subject to a category 

// db.category.findOrCreate({
//   where: {
//     name: "Programming"
//   }
// }).then(function([category, created]) {
//   db.subject.findOrCreate({
//     where: {
//       name: "JavaScript"
//     }
// }).then(function([subject, created]) {
//   category.addSubject(subject).then(function(relationInfo) {
//     console.log(subject.name + " was added to, " + category.name )
//   })
// })
// })


// db.category.findOrCreate({
//     where: {

//     },
// });

/******************************/
// subCategory.init({
// name: DataTypes.STRING,
// categoryId: DataTypes.INTEGER
// },

// db.subCategory.findOrCreate({
//     where: {

//     },
//   });

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

// db.course.findOrCreate({ // course creation
//   where: {
//     name: "Introduction to JavaScript",
//     time: "3 Hours",
//     difficulty: "Beginner",
//     description: "An online guide to the basics of JavaScript"
//   },
// }) // end of course creation
// .then(function ([course, created]) {
//   db.category.findOrCreate({ // find or creating category
//     where: {
//       name: "Programming"
//     }
//   })
//   .then(function ([category, created]) {
//     category.addCourse(course).then(function (courseCatInfo) { // add that category to course
//       db.subject.findOrCreate({ // find or creating subject
//         where: {
//           name: "JavaScript"
//         }
//       })
//       .then(function ([subject, created]) {
//         subject.addCourse(course).then(function (courseSubInfo) { // add that subject to course
//           db.instructor.findOrCreate({ // find or create instructor
//             where: {
//               username: "GPAdmin"
//             }
//           })
//           .then(function ([instructor, created]) {
//             instructor.addCourse(course).then(function (courseInstInfo) { // add that instructor to course
//               console.log(course)
//             }) // end of log 
//           }) // end of function add 
//         }) // end of function instructorfindOrCreate
//       }) // end of function subAdd
//     }) // end of function subfindOrCreate
//   }) // end of function catAdd
// }) // end of function catfindOrCreate



  //       db.subject.findOrCreate({
  //         where: {
  //           name: "JavaScript"
  //         }
  //       }).then(function ([subject, created]) {
  //         course.addSubject(subject).then(function (courseSubInfo) {
  //             db.instructor.findOrCreate({
  //               where: {
  //                 username: "GPAdmin"
  //               }
  //             }).then(function ([instructor, created]) {
  //               course.addInstructor(instructor).then(function (relationInstructorInfo) {
  //                   console.log(seperator)
  //                   console.log(`${course.name} is a category in ${category.name} and the subject is ${subject.name},
  //             taught by ${instructor.username}`)
  //                 })
  //             })
  //           })
  //       })
  //     })
  //   })
  // })

    //     }).then(function ([subject, created]) {
  //       db.instructor.findOrCreate({
  //         where: {
  //           username: "GPAdmin"
  //         }
  //       }).then(course.addCategory(category)
  //       ).then(course.addSubject(subject)
  //       ).then(course.addInstructor(instructor)
  //       ).then(function (course) {
  //         console.log(seperator)
  //         console.log(`${course.name} is a category in ${category.name} and the subject is ${subject.name},
  //         taught by ${instructor.username}`)
  //       })
  //     })
  //   })
  // })
/******************************/
//   usersCourses.init({
//     userId: DataTypes.INTEGER,
//     courseId: DataTypes.INTEGER
//   },

// db.usersCourses.findOrCreate({
//     where: {

//     },
//   });
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

// db.lecture.findOrCreate({
//     where: {

//     },
//   });

/******************************/
//   payment.init({
//     cardNumber: DataTypes.INTEGER,
//     carrier: DataTypes.STRING,
//     expiration: DataTypes.STRING,
//     cvc: DataTypes.INTEGER,
//     userId: DataTypes.INTEGER,
//     instructorId: DataTypes.INTEGER
//   },

// db.payment.findOrCreate({
//     where: {
        
//     },
//   })

