require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const passport = require('../config/ppConfig');
const session = require('express-session');
const studentRouter = express.Router();
const helper = require('../helper')
const flash = require('connect-flash');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt')

studentRouter.use(require('morgan')('dev'));
studentRouter.use(express.urlencoded({ extended: false }));
studentRouter.use(methodOverride('_method'))
studentRouter.use(express.json());
studentRouter.use(express.static(__dirname + '/public'));
studentRouter.use(layouts);

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
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});


studentRouter.get('/login', (req, res) => {
  res.render('auth/student/login'); // this is a form
});

studentRouter.get('/logout/:id', (req, res) => {
  req.logOut(); // logs the user out of the session
  req.flash('success_msg, logging out now, may our path continue another time');
  res.redirect('/');
});

studentRouter.get('/signup', (req, res) => {
  res.render('auth/student/signup'); // this is a form
});

studentRouter.put('/profile-edit/:id', isUserLoggedIn, (req, res) => {
  const { username, tag, firstName, lastName, phoneNumber, birthday, location, about} = req.body
  if (req.user.id != req.params.id) {
    req.flash('error_msg', 'Permission Denied - Please go to saftey')
    res.redirect(303, `/`)
  } else {
    helper.updateStudent(username, tag, firstName, lastName, phoneNumber, birthday, location, about, req.params.id)
      console.log('STUDENT SHOULD BE UPDATED ********************')
      res.redirect(303, `/student/profile-edit/${req.params.id}`)
    }
  } 
)

studentRouter.get('/profile-edit/:id', isUserLoggedIn, (req, res) => {
  if (req.user.id != req.params.id) {
    req.flash('error_msg', 'Permission Denied - Please go to saftey')
    res.redirect(303, `/`)
  } else {
  db.user.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (user) {
    res.render('auth/student/profile-edit' , { user }); // this is a form
  })
}
});

studentRouter.get('/dashboard/:id', isUserLoggedIn, (req, res) => {
  if (req.user.id != req.params.id) {
    req.flash('error_msg', 'Permission Denied - Please go to saftey' )
    res.redirect(303, '/')
  } else {
    db.user.findOne({
      where: {id: req.user.id}}).then(function(user){
        res.render('auth/student/dashboard', { user }); // this is a form
    })
  }
})

studentRouter.get('/security/:id', isUserLoggedIn,(req, res) => {
  if (req.user.id != req.params.id) {
    req.flash('error_msg, Permission Denied - Please go to saftey')
    res.redirect(303, `/`)
  } else {
  db.user.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (user) {
    res.render('auth/instructor/security', {user}); // this is a form
  })
  res.render('auth/student/security'); // this is a form
}
});

studentRouter.put("/security/:id", isUserLoggedIn, (req, res) => {
  const { email, currentPassword, newPassword, confirmPassword } = req.body;

  if (email == undefined && newPassword == undefined) {
    req.flash("error_msg", "Please input your new password or email");
    res.redirect(303, `/student/security/${req.params.id}`);

  } else if (email != undefined) {
    db.user
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
        res.redirect(303, `/student/security/${req.params.id}`);
      });

  } else if (newPassword != undefined && newPassword === confirmPassword) {
    let hash = bcrypt.hashSync(newPassword, 12);

    db.user
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((user) => {
        console.log(user)
        let passwordsMatch = user.validPassword(currentPassword)
        if (!passwordsMatch) {
          req.flash('error_msg', "Sorry, you've entered the wrong password");
          res.redirect(303, `/student/security/${req.params.id}`);
        } else {
          db.user.update({ password: hash, },
          {
            where: {
              id: req.params.id
            },
          }
          ).then((updatedPassword) => {
            req.flash("success_msg", "Successfully changed your password.");
            res.redirect(303, `/student/security/${req.params.id}`);
            })
        }
      })
    }
})

studentRouter.get('/delete-profile/:id', isUserLoggedIn,(req, res) => {
  db.user.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (user) {
    res.render('auth/student/delete-profile', { user }); // this is a form
  })
});

studentRouter.delete("/delete-profile/:id", isUserLoggedIn, (req, res) => {
  db.user.destroy({
      where: {
        id: req.params.id,
      },
    });
    req.logOut();
    req.flash('error_msg', 'Goodbye, do not get lost in your path for knowledge without us');
    res.redirect("/");
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
      req.flash('error_msg', 'Email already exists');
      res.redirect('/student/signup');
    }
  })
  .catch(error => {
    console.log('**************Error');
    console.log('error==>>>', error);
    req.flash('error_msg', 'Either email or password is incorrect. Please try again.');
    res.redirect('/student/signup');
  });
});


studentRouter.post('/login', passport.authenticate('user-local', {
  successRedirect: `/`,
  failureRedirect: '/student/login',
  successFlash: 'Welcome back, let us continue your path',
  failureFlash: true,
}));


module.exports = studentRouter;