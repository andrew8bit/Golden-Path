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
    let userGroup = "students";
    console.log(userObject)
    let userPrototype = userObject.role;

    if (userPrototype === "students") { // this allows us to differentiate students
        console.log("set userPrototype of students")
        userGroup = "students";
    } else if (userPrototype === "instructor") {
        console.log("set userPrototype of instructor") // this allows us to differentiate students
        userGroup = "instructor"
    } 

    let sessionContructor = new SessionConstructor(userObject.id, userGroup, '')
    cb(null, sessionContructor);

    console.log(sessionContructor)
});

passport.deserializeUser(function (sessionConstructor, cb) {

    if (sessionConstructor.userGroup === 'students') { //test to see if the user signed in as student or instructor
        console.log('deserializing')
        db.user.findByPk(sessionConstructor.userId)
        .then(user => {
            if (user) {
                console.log('deserialized success ---------^^^^ ')
                cb(null, user);
            }
            console.log('User is null...');
        })
        .catch(error => {
            console.log('**************************** Error:ln49' );
            console.log(error);
        })
    } else if(sessionConstructor.userGroup === 'instructor') { //test to see if the user signed in as student or instructor
        db.instructor.findByPk(sessionConstructor.userId)
        .then(instructor => {
            if (instructor) {
                console.log('deserialized sucess')
                cb(null, instructor);
            }
            console.log('Instructor is null...');
        })
        .catch(error => {
            console.log('**************************** Error:ln62');
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
            console.log('validating user...')
            return cb(null, false, {message: 'Email or password is incorrect'})
        } else {
            return cb(null, user);
        }
    })
    .catch(error => {
        console.log('**************************** Error:ln85');
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
            console.log('validating instructor... ')
            return cb(null, false, {message: 'Email or password is incorrect'})
        } else {
            return cb(null, instructor);
        }
    })
    .catch(error => {
        console.log('**************************** Error:ln106');
        console.log(error);
    })
}));


module.exports = passport;