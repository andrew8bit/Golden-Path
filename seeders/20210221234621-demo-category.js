'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name:'Programming',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Design',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Finance',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Digital Business',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Language',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Retail',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Lifestyle',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Music',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Photography',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Food',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Art',
        createdAt: new Date(),
        updatedAt: new Date(), 
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
