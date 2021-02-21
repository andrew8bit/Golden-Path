'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('instructors', [
      {
        username: 'GPInstructor',
        role: 'Instructor',
        img: null,
        tag: 'Golden Path Instructor',
        email: 'GoldenPath@gmail.com',
        password: 'Password',
        firstName: 'Golden',
        lastName: 'Path',
        phoneNumber: '0000000000',
        birthday: '02/21/2021',
        location: 'USA',
        about: 'I am a GP Test Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'GPAdmin',
        role: 'Instructor',
        img: null,
        tag: 'Golden Path',
        email: 'GoldenPath01@gmail.com',
        password: 'Password',
        firstName: 'Golden',
        lastName: 'Path',
        phoneNumber: '0000000000',
        birthday: '02/21/2021',
        location: 'USA',
        about: 'I am a GP Test Admin 2',
        createdAt: new Date(),
        updatedAt: new Date(), 
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('instructors', null, {});
  }
};
