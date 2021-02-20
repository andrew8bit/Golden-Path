const { Sequelize } = require("sequelize");
const db = require("./models");
const Op = Sequelize.Op;

// /*************************************** INSTURCTOR FUNCTIONS ************************************/
const createInstructor = (email, password) => {
  db.instructor
    .findOrCreate({
      where: {
        email: email,
        password: password,
      },
    })
    .then(function ([instructor, created]) {
      console.log(instructor);
    });
};

const updateInstructor = (
  userId,
  username,
  tag,
  firstName,
  lastName,
  phoneNumber,
  birthday,
  location,
  about
) => {
  db.instructor
    .update(
      {
        username: username,
        tag: tag,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        birthday: birthday,
        location: location,
        about: about,
      },
      {
        where: {
          id: userId,
        },
      }
    )
    .then(function (user) {
      console.log(user);
    });
};

const settingsInstructor = (instructorId, email, password) => {
    db.instructor.update({
        email: email, 
        password: password,
    },
    {
        where: {
            id: instructorId,
        }
    })
}
const deleteInstructor = (instructorId) => {
  db.instructor.destroy({
    where: {
      id: instructorId,
    },
  });
};

/*************************************** INSTUCTOR FUNCTIONS ************************************/
const createUser = (email, password) => {
  db.user
    .findOrCreate({
      where: {
        email: email,
        password: password,
      },
    })
    .then(function ([user, created]) {
      console.log(user);
    });
};

const updateUser = (
  userId,
  username,
  img,
  firstName,
  lastName,
  phoneNumber,
  birthday,
  location,
  about
) => {
  db.user
    .update(
      {
        username: username,
        img: img,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        birthday: birthday,
        location: location,
        about: about,
      },
      {
        where: {
          id: userId,
        },
      }
    )
    .then(function (user) {
      console.log(user);
    });
};

const settingsUser = (userId, email, password) => {
    db.instructor.update({
        email: email, 
        password: password,
    },
    {
        where: {
            id: userId,
        }
    })
}
const deleteUser = (userId) => {
  db.user.destroy({
    where: {
      id: userId,
    },
  });
};

// /*************************************** COURSE SUBJECT FUNCTIONS *******************************/
const addCategorySubject = (categoryName, subjectName) => {
  db.category
    .findOrCreate({
      where: {
        name: "Programming",
      },
    })
    .then(function ([category, created]) {
      db.subject
        .findOrCreate({
          where: {
            name: "JavaScript",
          },
        })
        .then(function ([subject, created]) {
          category.addSubject(subject).then(function (relationInfo) {
            console.log(subject.name + " was added to, " + category.name);
          });
        });
    });
};

const createCourse = () => {
  db.course
    .findOrCreate({
      // course creation
      where: {
        name: "Introduction to JavaScript",
        time: "3 Hours",
        difficulty: "Beginner",
        description: "An online guide to the basics of JavaScript",
      },
    }) // end of course creation
    .then(function ([course, created]) {
      db.category
        .findOrCreate({
          // find or creating category
          where: {
            name: "Programming",
          },
        })
        .then(function ([category, created]) {
          category.addCourse(course).then(function (courseCatInfo) {
            // add that category to course
            db.subject
              .findOrCreate({
                // find or creating subject
                where: {
                  name: "JavaScript",
                },
              })
              .then(function ([subject, created]) {
                subject.addCourse(course).then(function (courseSubInfo) {
                  // add that subject to course
                  db.instructor
                    .findOrCreate({
                      // find or create instructor
                      where: {
                        username: "GPAdmin",
                      },
                    })
                    .then(function ([instructor, created]) {
                      instructor
                        .addCourse(course)
                        .then(function (courseInstInfo) {
                          // add that instructor to course
                          console.log(course);
                        }); // end of log
                    }); // end of function add
                }); // end of function instructorfindOrCreate
              }); // end of function subAdd
          }); // end of function subfindOrCreate
        }); // end of function catAdd
    }); // end of function catfindOrCreate
};

const courseSearch = (search) => {
    let searchArray = search.split(" ")
    let regexSearch = new RegExp(searchArray.join("|", " "))
    console.log(regexSearch)
    db.course.findAll({
    where : {
        [Op.or]: [
            { 
                name: {
                    [Op.iRegexp]: `${regexSearch}`
                }
            },



            {
                description: {
                    [Op.iRegexp]: `${regexSearch}`
                }
            }
        ]
    }
    }).then(function (allCourses) {
        console.log('********************************')
        console.log(allCourses)
    })
}

// courseSearch("what intro blue")

/*************************************** Exports ***********************************************/
modules.export = {
    createInstructor, 
    updateInstructor,
    settingsInstructor,
    deleteInstructor,
    createUser,
    updateUser,
    settingsUser,
    deleteUser,
    addCategorySubject,
    createCourse,
    courseSearch,
}