const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Database
const db = require('../models');
const User = require('../models/user');
const Instructor = require('../models/instructor');

function SessionConstructor(userId, userGroup, details) {
    this.userId = userId,
    this.userGroup = userGroup,
    this.details = details;
}

// Passport "serialize" info to be able to login
passport.serializeUser((userObject, cb) => {
    // userObject can be any model
    let userGroup = "students";
    let userPrototype = Object.getPrototypeOf(userObject);

    if (userPrototype === User.prototype) {
        console.log("set prototype of students")
        userGroup = "students";
    } else if (userPrototype === Instructor.prototype) {
        console.log("set prototype of instructor")
        userGroup = "instructor"
    } 

    let sessionContructor = new SessionConstructor(userObject.id, userGroup, '')
    cb(null, sessionContructor);

    console.log(sessionContructor)
});

passport.deserializeUser(function (sessionConstructor, cb) {

    if (sessionConstructor.userGroup === 'students') {
        console.log('line 38 done')
        db.user.findByPk(sessionConstructor.userId)
        .then(user => {
            if (user) {
                console.log('deserialized success ---------^^^^ ')
                cb(null, user);
            }
            console.log('User is null...');
        })
        .catch(error => {
            console.log('Yo... There is an error');
            console.log(error);
        })
    } else if(sessionConstructor.userGroup === 'instructor') {
        db.instructor.findByPk(sessionConstructor.id)
        .then(user => {
            if (user) {
                cb(null, user);
            }
            console.log('Instructor is null...');
        })
        .catch(error => {
            console.log('Yo... There is an error');
            console.log(error);
        })
    }
})

passport.use('user-local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    role: 'student',
}, (email, password, cb) => {
    db.user.findOne({
        where: { email }
    })
    .then(user => {
        if (!user || !user.validPassword(password)) {
            console.log('userlocal false')
            cb(null, false);
        } else {
            console.log('userlocal-user')
            cb(null, user);
        }
    })
    .catch(error => {
        console.log('**************************** Error');
        console.log(error);
    })
}));

passport.use('instructor-local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {
    db.instructor.findOne({
        where: { email }
    })
    .then(instructor => {
        if (!instructor || !instructor.validPassword(password)) {
            cb(null, false);
        } else {
            cb(null, user);
        }
    })
    .catch(error => {
        console.log('**************************** Error');
        console.log(error);
    })
}));


module.exports = passport;