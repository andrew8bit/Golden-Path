'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('courses', [
      {
        title:'Javascript Crash Course',
        img:null,
        time: '3 Hours',
        difficulty: 'Beginner',
        description: 'This is a beginner course to Javascript',
        categoryId: 1,
        subjectId: 2,
        instructorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        title:'Bitcoin The Halvening',
        img:null,
        time: '2 Hours',
        difficulty: 'Advanced',
        description: 'This is an advanced analysis crash course about the bitcoin halvening.',
        categoryId: 3,
        subjectId: 19,
        instructorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        title:'Digital Artibtage Explained',
        img:null,
        time: '3 Hours',
        difficulty: 'Beginner',
        description: 'Take advantage of price discrepencies, from the convience of home!',
        categoryId: 4,
        subjectId: 28,
        instructorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        title:'GoLang Bootcamp',
        img:null,
        time: '8 Hours',
        difficulty: 'Beginner',
        description: 'Learn Google Language to stand out in the job market!',
        categoryId: 1,
        subjectId: 5,
        instructorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses', null, {});
  }
};

