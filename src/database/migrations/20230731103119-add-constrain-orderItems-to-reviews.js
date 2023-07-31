"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Reviews", {
      fields: ["orderItemId"],
      name: "fk_tickets_ticketOrderId",
      type: "foreign key",
      references: {
        table: "orderItems",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Reviews",
      "fk_tickets_ticketOrderId"
    );
  },
};
