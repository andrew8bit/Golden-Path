require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const passport = require('../config/ppConfig');
const session = require('express-session');
const studentRouter = express.Router();
const helper = require('../helper')
const bodyParser = require('body-parser')
const flash = require('connect-flash');

// import database
const db = require('../models');

const SECRET_SESSION = process.env.SECRET_SESSION;
const isUserLoggedIn = require('../middleware/isUserLoggedIn');
const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}

studentRouter.use(session(sessionObject));
// Passport
studentRouter.use(passport.initialize()); // Initialize passport
studentRouter.use(passport.session()); // Add a session
// Flash 
studentRouter.use(flash());
studentRouter.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});



studentRouter.get('/login', (req, res) => {
  res.render('auth/student/login'); // this is a form
});

studentRouter.get('/logout', (req, res) => {
  req.logOut(); // logs the user out of the session
  req.flash('sucess, logging out, you may continue your path next time');
  res.redirect('/');
});

studentRouter.get('/signup', (req, res) => {
  res.render('auth/student/signup'); // this is a form
});

studentRouter.get('/profile-edit/:id', isUserLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get()
  res.render('auth/student/profile-edit' , { id, name, email }); // this is a form
});
studentRouter.get('/dashboard/:id', isUserLoggedIn, (req, res) => {
  res.render('auth/student/dashboard'); // this is a form
});
studentRouter.get('/security/:id', isUserLoggedIn,(req, res) => {
  res.render('auth/student/security'); // this is a form
});
studentRouter.get('/payment-method/:id', isUserLoggedIn,(req, res) => {
  res.render('auth/student/payment-method'); // this is a form
});
studentRouter.get('/delete-profile/:id', isUserLoggedIn,(req, res) => {
  res.render('auth/student/delete-profile'); // this is a form
});



// What routes do we need (post routes)
studentRouter.post('/signup/:id', (req, res,) => {
  // we now have access to the user info (req.body);
  // console.log(req.body);
  const { email, username, password } = req.body; // goes and us access to whatever key/value inside of the object (req.body)
  db.user.findOrCreate({
    where: { email },
    defaults: { username, password }
  })
  .then(([user, created]) => {
    if (created) {
      // if created, success and we will redirect back to / page
      console.log(`${user.username} was created....`);
      // flash messages
      const successObject = {
        successRedirect: `/student/profile-edit/${user.id}`,
        successFlash: `Welcome ${user.username}. Account was created and logging in...`
      }
      // passport authenicate
      passport.authenticate('user-local', successObject)(req, res,)
    } else {
      // Send back email already exists
      req.flash('error', 'Email already exists');
      res.redirect('/student/signup');
    }
  })
  .catch(error => {
    console.log('**************Error');
    console.log('error==>>>', error);
    req.flash('error', 'Either email or password is incorrect. Please try again.');
    res.redirect('/student/signup');
  });
});


studentRouter.post('/login', passport.authenticate('user-local', {
  successRedirect: '/student/dashboard',
  failureRedirect: '/student/login',
  successFlash: 'Welcome back, let us continue your path',
  failureFlash: 'Either email or password is incorrect' 
}));


module.exports = studentRouter;