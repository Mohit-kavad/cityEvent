"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("orderItems", {
      fields: ["ticketOrderId"],
      name: "fk_orderItems_ticketOrderId",
      type: "foreign key",
      references: {
        table: "ticketOrders",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "orderItems",
      "fk_orderItems_ticketOrderId"
    );
  },
};
