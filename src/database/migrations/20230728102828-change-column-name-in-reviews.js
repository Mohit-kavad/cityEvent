"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Reviews", "userId", "orderItemId");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Reviews", "orderItemId", "userId");
  },
};
