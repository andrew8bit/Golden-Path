require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const passport = require('../config/ppConfig');
const session = require('express-session');
const instructorRouter = express.Router();
const helper = require('../helper')
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const methodOverride = require('method-override');

instructorRouter.use(require('morgan')('dev'));
instructorRouter.use(express.urlencoded({ extended: false }));
instructorRouter.use(methodOverride('_method'))
instructorRouter.use(express.json());
instructorRouter.use(express.static(__dirname + '/public'));
instructorRouter.use(layouts);

// import database
const db = require('../models');

const SECRET_SESSION = process.env.SECRET_SESSION;
const isInstructorLoggedIn = require('../middleware/isInstructorLoggedIn');
const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}

instructorRouter.use(session(sessionObject));
// Passport
instructorRouter.use(passport.initialize()); // Initialize passport
instructorRouter.use(passport.session()); // Add a session
// Flash 
instructorRouter.use(flash());
instructorRouter.use((req, res, next) => {
  console.log(res.locals.currentUser);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

instructorRouter.use(session(sessionObject));
// Passport
instructorRouter.use(passport.initialize()); // Initialize passport
instructorRouter.use(passport.session()); // Add a session
// Flash 
instructorRouter.use(flash());

instructorRouter.get('/login', (req, res) => {
  res.render('auth/instructor/login'); // this is a form
});

instructorRouter.get('/logout/:id', (req, res) => {
  req.logOut(); // logs the user out of the session
  req.flash('success', 'Logging out... See you next time!');
  res.redirect('/');
});

instructorRouter.get('/signup', (req, res) => {
  res.render('auth/instructor/signup'); // this is a form
});


instructorRouter.put('/profile-edit/:id', isInstructorLoggedIn, (req, res) => {
  const { username, tag, firstName, lastName, phoneNumber, birthday, location, about,} = req.body
  if (req.user.id != req.params.id) {
    console.log('WOAH BRO YOU DIDN NOT WANT THAT ')

  } else {
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
          id: req.params.id,
        }
      ,
      }
    ).then(updated => {
      res.redirect(303, `/instructor/profile-edit/${req.params.id}`)
    })
  } 
})

  
  instructorRouter.get('/profile-edit/:id', isInstructorLoggedIn, (req, res) => {
    db.instructor.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (instructor) {
      res.render('auth/instructor/profile-edit', {instructor}); // this is a form
    })
  });


instructorRouter.get('/profile/:id', isInstructorLoggedIn, (req, res) => {
  res.render('auth/instructor/profile'); // this is a form
});
instructorRouter.get('/my-courses/:id', isInstructorLoggedIn, (req, res) => {
  res.render('auth/instructor/my-courses'); // this is a form
});

instructorRouter.get('/security/:id', isInstructorLoggedIn, (req, res) => {
  res.render('auth/instructor/security'); // this is a form
});
instructorRouter.get('/payment-method/:id', isInstructorLoggedIn, (req, res) => {
  res.render('auth/instructor/payment-method'); // this is a form
});
instructorRouter.get('/delete-profile/:id', isInstructorLoggedIn, (req, res) => {
  res.render('auth/instructor/delete-profile'); // this is a form
});
instructorRouter.get('/add-course/:id', isInstructorLoggedIn, (req, res) => {
  res.render('auth/instructor/add-course'); // this is a form
});


// What routes do we need (post routes)
instructorRouter.post('/signup/:id', (req, res) => {
  // we now have access to the user info (req.body);
  // console.log(req.body);
  const { username, email, password } = req.body; // goes and us access to whatever key/value inside of the object (req.body)
  db.instructor.findOrCreate({
    where: { email },
    defaults: { username, password }
  })
  .then(([instructor, created]) => {
    if (created) {
      // if created, success and we will redirect back to / page
      console.log(`${instructor.username} was created....`);
      // flash messages
      const successObject = {
        successRedirect: `/instructor/profile-edit/${instructor.id}`,
        successFlash: `Welcome ${instructor.username}. Account was created and logging in...`
      }
      // passport authenicate
      passport.authenticate('instructor-local', successObject)(req, res);
    } else {
      // Send back email already exists
      req.flash('error', 'Email already exists');
      res.redirect('/instructor/signup');
    }
  })
  .catch(error => {
    console.log('**************Error');
    console.log(error);
    req.flash('error', 'Either email or password is incorrect. Please try again.');
    res.redirect('/instructor/signup');
  });
});

instructorRouter.post('/login', passport.authenticate('instructor-local', {
  successRedirect: '/',
  failureRedirect: '/instructor/login',
  successFlash: 'Welcome back ...',
  failureFlash: 'Either email or password is incorrect' 
}));




module.exports = instructorRouter;