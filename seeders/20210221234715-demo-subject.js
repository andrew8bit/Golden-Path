'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subjects', [
      {
        name:'Web Development',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Javascript' ,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Bootstrap',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Data and Algorithms' ,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'GoLang',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'NodeJS' ,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'React',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'HTML5' ,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Angular',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Graphic Design' ,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Illustrator' ,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'UX/UI Design' ,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Figma Design' ,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Adobe XD' ,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Sketch' ,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Icon Design' ,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Photoshop' ,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Stock Market' ,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Crypto Currency' ,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Options Market' ,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Forex Market' ,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Bonds 101' ,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Trading Signals' ,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Longterm Investing' ,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Accounting' ,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Business Administration' ,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Mutual Funds' ,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Digital Arbitage' ,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Dropshipping 101' ,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'E-Commerce' ,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Amazon FBA' ,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Marketing' ,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Social Media' ,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
      {
        name:'Influencer' ,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subjects', null, {});
  }
};
