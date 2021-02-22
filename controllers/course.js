require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const passport = require('../config/ppConfig');
const session = require('express-session');
const courseRouter = express.Router();
const helper = require('../helper')
const flash = require('connect-flash');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt')
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

courseRouter.use(require('morgan')('dev'));
courseRouter.use(express.urlencoded({ extended: false }));
courseRouter.use(methodOverride('_method'))
courseRouter.use(express.json());
courseRouter.use(express.static(__dirname + '/public'));
courseRouter.use(layouts);

// import database
const db = require('../models');


courseRouter.get('/:id', (req, res) => {
  db.course.findByPk(req.params.id, {include: [db.instructor, db.category, db.subject, db.lecture]})
  .then(course => {
    res.render('courseShow', { course });
  })
});

courseRouter.get('/results/search?', (req, res) => {
  let search = req.query.search
  let regexSearch = new RegExp(search.split(" ").join("|", " "))
    db.course.findAll({
      where : {
        [Op.or]: [
            { 
                title: {
                  [Op.or]: {
                    [Op.iRegexp]: `%${regexSearch}%`,
                    [Op.iLike]: `%${search}%`

                  }
                }
            },
            {
                description: {
                  [Op.or]: {
                    [Op.iRegexp]: `%${regexSearch}%`,
                    [Op.iLike]: `%${search}%`
                  }
                }
            }
        ]
    },
    include: [{model: db.instructor, as: 'instructor'}, {model: db.category, as: 'category'}, {model: db.subject, as: 'subject'}],
  }).then(courses => {
    console.log(courses)
    console.log(search);
    res.render('results', {courses: courses, search: search})
  })
});


module.exports = courseRouter;