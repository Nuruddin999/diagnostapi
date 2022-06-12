'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let list=[]
   for (let index = 0; index < 50; index++) {
     let appl = {
      name: `appl${index}`,
      patientRequest: `pochki${index}`,
      fundName: `Nadezda${index}`,
      manager: `Sultan${index}`,
      creationDate: new Date().toLocaleString(),
      execDate:  new Date().toLocaleString(),
      createdAt: new Date(),
      updatedAt: new Date()
     }
     list.push(appl)
   }
    await queryInterface.bulkInsert('Applications', list, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
