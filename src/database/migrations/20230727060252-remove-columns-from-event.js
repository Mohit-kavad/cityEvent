"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Events", "startDate");
    await queryInterface.removeColumn("Events", "endDate");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Events", "startDate", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn("Events", "endDate", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
