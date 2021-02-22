'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lectures', [
      {
        title:'Introduction to JavaScript',
        difficulty: 'Beginner',
        time: '1 Hour',
        courseId: 1,
        content: 'This is an introduction to JavaScript lecture',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        title:'What is Bitcoin?',
        difficulty: 'Beginner',
        time: '1 Hour',
        courseId: 2,
        content: 'You may have heard the story of the 200-Million-Dollar pizza. In May 2010, Laszlo Hanyecz bought 2 Papa Johns Pizzas for 10,000 BTC. If he had denied his cravings, he would have a net worth equivalent to Leonardo Dicaprio',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        title:'What is Arbitage?',
        difficulty: 'Beginner',
        time: '1 Hour',
        courseId: 3,
        content: 'The heart and core conecpt of any arbitage business is to take advantage of a low price and resell higher. Sounds simple right? Well, we are going to make sure it is as easy as it sounds!',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        title:'Golang',
        difficulty: 'Beginner',
        time: '2 Hour',
        courseId: 4,
        content: 'Go programming language is a statically-typed language with syntax similar to that of C',
        createdAt: new Date(),
        updatedAt: new Date(), 
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lectures', null, {});
  }
};
