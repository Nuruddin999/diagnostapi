'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Smeta', 'diagnosis', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Smeta', 'diagnosis', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
