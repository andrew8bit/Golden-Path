require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const passport = require('../config/ppConfig');
const router = express.Router();

// import database
// const db = require('../models');

// router.get('/student/signup', (req, res) => {
//   res.render('auth/student/signup'); // this is a form
// });

// router.get('/student/login', (req, res) => {
//   res.render('auth/student/login'); // this is a form
// });

// router.get('/instructor/signup', (req, res) => {
//   res.render('auth/instructor/signup'); // this is a form
// });

// router.get('/instructor/login', (req, res) => {
//   res.render('auth/instructor/login'); // this is a form
// });

// router.get('/logout', (req, res) => {
//   req.logOut(); // logs the user out of the session
//   req.flash('success', 'Logging out... See you next time!');
//   res.redirect('/');
// });

// router.get('/student/profile-edit', (req, res) => {
//   res.render('auth/student/profile-edit'); // this is a form
// });

// router.get('/instructor/profile-edit', (req, res) => {
//   res.render('auth/instructor/profile-edit'); // this is a form
// });


// What routes do we need (post routes)
// router.post('/signup', (req, res) => {
  // we now have access to the user info (req.body);
  // console.log(req.body);
//   const { email, name, password } = req.body; // goes and us access to whatever key/value inside of the object (req.body)
//   db.user.findOrCreate({
//     where: { email },
//     defaults: { name, password }
//   })
//   .then(([user, created]) => {
//     if (created) {
//       // if created, success and we will redirect back to / page
//       console.log(`${user.name} was created....`);
//       // flash messages
//       const successObject = {
//         successRedirect: '/',
//         successFlash: `Welcome ${user.name}. Account was created and logging in...`
//       }
//       // passport authenicate
//       passport.authenticate('local', successObject)(req, res);
//     } else {
//       // Send back email already exists
//       req.flash('error', 'Email already exists');
//       res.redirect('/auth/signup');
//     }
//   })
//   .catch(error => {
//     console.log('**************Error');
//     console.log(error);
//     req.flash('error', 'Either email or password is incorrect. Please try again.');
//     res.redirect('/auth/signup');
//   });
// });

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/auth/login',
//   successFlash: 'Welcome back ...',
//   failureFlash: 'Either email or password is incorrect' 
// }));


module.exports = router;