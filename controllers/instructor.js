require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const passport = require('../config/ppConfig');
const session = require('express-session');
const instructorRouter = express.Router();
const helper = require('../helper')
const flash = require('connect-flash');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt')

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
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

instructorRouter.get('/login', (req, res) => {
  res.render('auth/instructor/login'); // this is a form
});

instructorRouter.get('/logout/:id', (req, res) => {
  req.logOut(); // logs the user out of the session
  req.flash('success_msg', 'Logging out... See you next time!');
  res.redirect('/');
});

instructorRouter.get('/signup', (req, res) => {
  res.render('auth/instructor/signup'); // this is a form
});


instructorRouter.put('/profile-edit/:id', isInstructorLoggedIn, (req, res) => {
  const { username, tag, firstName, lastName, phoneNumber, birthday, location, about} = req.body
  if (req.user.id != req.params.id) {
    req.flash('error_msg, Permission Denied - Please go to saftey')
    res.redirect(303, `/`)
  } else {
    helper.updateInstructor(username, tag, firstName, lastName, phoneNumber, birthday, location, about, req.params.id)
      res.redirect(303, `/instructor/profile-edit/${req.params.id}`)
    }
  } 
)

  
instructorRouter.get('/profile-edit/:id', isInstructorLoggedIn, (req, res) => {
  db.instructor.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (instructor) {
    res.render('auth/instructor/profile-edit', { instructor }); // this is a form
  })
});

instructorRouter.get('/profile/:id', isInstructorLoggedIn, (req, res) => {
  res.render('auth/instructor/profile'); // this is a form
});

instructorRouter.get('/my-courses/:id', isInstructorLoggedIn, (req, res) => {
  res.render('auth/instructor/my-courses'); // this is a form
});

instructorRouter.get('/security/:id', isInstructorLoggedIn, (req, res) => {
  db.instructor.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (instructor) {
    res.render('auth/instructor/security', {instructor}); // this is a form
  })
});

instructorRouter.put("/security/:id", isInstructorLoggedIn, (req, res) => {
  const { email, currentPassword, newPassword, confirmPassword } = req.body;

  if (email == undefined && newPassword == undefined) {
    req.flash("error_msg", "Please input your new password or email");
    res.redirect(303, `/instructor/security/${req.params.id}`);

  } else if (email != undefined) {
    db.instructor
      .update(
        {
          email: email,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((update) => {
        req.flash("success_msg", "Sucessfully changed your email! ");
        res.redirect(303, `/instructor/security/${req.params.id}`);
      });

  } else if (newPassword != undefined && newPassword === confirmPassword) {
    let hash = bcrypt.hashSync(newPassword, 12);

    db.instructor
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((instructor) => {
        console.log(instructor)
        let passwordsMatch = instructor.validPassword(currentPassword)
        if (!passwordsMatch) {
          req.flash('error_msg', "Sorry, you've entered the wrong password");
          res.redirect(303, `/instructor/security/${req.params.id}`);
        } else {
          db.instructor.update({ password: hash, },
          {
            where: {
              id: req.params.id
            },
          }
          ).then((updatedPassword) => {
            req.flash("success_msg", "Successfully changed your password.");
            res.redirect(303, `/instructor/security/${req.params.id}`);
            })
        }
      })
    }
})

instructorRouter.get('/delete-profile/:id', isInstructorLoggedIn, (req, res) => {
  db.instructor.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (instructor) {
    res.render('auth/instructor/delete-profile', {instructor}); // this is a form
  })
});

instructorRouter.delete("/delete-profile/:id", isInstructorLoggedIn,(req, res) => {
  db.instructor.destroy({
      where: {
        id: req.params.id,
      },
    });
    req.logOut();
    req.flash('error_msg', 'Goodbye, do not let lost in your path for knowledge without us');
    res.redirect("/");
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
      req.flash('error_msg', 'Email already exists');
      res.redirect('/instructor/signup');
    }
  })
  .catch(error => {
    console.log('**************Error');
    console.log(error);
    req.flash('error_msg', 'Either email or password is incorrect. Please try again.');
    res.redirect('/instructor/signup');
  });
});

instructorRouter.post('/login', passport.authenticate('instructor-local', {
  successRedirect: '/',
  failureRedirect: '/instructor/login',
  successFlash: 'Welcome back ...',
  failureFlash: true 
}));




module.exports = instructorRouter;