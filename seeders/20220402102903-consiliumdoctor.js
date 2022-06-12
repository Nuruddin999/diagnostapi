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
   for (let index = 0; index < 5; index++) {
     let fk=30+index
     let appl = {
      name: `Ali${index}`,
      speciality: `urolog${index}`,
      applicationId: 30+1+index,
      createdAt: new Date(),
      updatedAt: new Date()
     }
     list.push(appl)
   }
    await queryInterface.bulkInsert('ConsiliumDoctors', list, {});
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
