'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Texts",
      "title",
      {
        type: Sequelize.TEXT,
        allowNull: false
      }

    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Texts", "title");
  }
};
