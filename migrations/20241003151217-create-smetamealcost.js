'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Smetamealcosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      placeName: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      daysQty: {
        type: Sequelize.STRING
      },
      peopleQty: {
        type: Sequelize.STRING
      },
      costPerDay: {
        type: Sequelize.STRING
      },
      totalCost: {
        type: Sequelize.STRING
      },
      infoSrc: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Smetamealcosts');
  }
};