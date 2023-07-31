import { User } from "./User";
import { Event_page } from "./Event_page";
import { Event } from "./Event";
import { Category } from "./Category";
import { Ticket } from "./Ticket";
import { orderItem } from "./Orderitem";
import { ticketOrder } from "./Ticketorder";
import { Payment } from "./Payment";
import { CategoryEvent } from "./Categoryevent";
import { Review } from "./Review";

User.hasMany(Event_page, { foreignKey: "userId" });
Event_page.belongsTo(User, { foreignKey: "userId" });

Event_page.hasMany(Event, { as: "Hosted by", foreignKey: "eventPageId" });
Event.belongsTo(Event_page, {
  as: "Hosted by",
  foreignKey: "eventPageId",
});

User.hasMany(Event, { foreignKey: "userId" });
Event.belongsTo(User, { foreignKey: "userId" });

Event.belongsToMany(Category, {
  through: "CategoryEvent",
  foreignKey: "eventId",
  otherKey: "categoryId",
  onDelete: "CASCADE",
});
Category.belongsToMany(Event, {
  through: "CategoryEvent",
  foreignKey: "categoryId",
  otherKey: "eventId",
});
CategoryEvent.belongsTo(Event, { foreignKey: "eventId" });
CategoryEvent.belongsTo(Category, { foreignKey: "categoryId" });

Event.hasMany(Ticket, {
  foreignKey: "eventId",
});
Ticket.belongsTo(Event, { foreignKey: "eventId" });

Ticket.hasMany(orderItem, { foreignKey: "ticketTypeId", as: "Ticket" });
orderItem.belongsTo(Ticket, { foreignKey: "ticketTypeId", as: "Ticket" });

ticketOrder.hasMany(orderItem, { foreignKey: "ticketOrderId" });
orderItem.belongsTo(ticketOrder, { foreignKey: "ticketOrderId" });

ticketOrder.hasOne(Payment, { foreignKey: "ticketOrderId" });
Payment.belongsTo(ticketOrder, { foreignKey: "ticketOrderId" });

orderItem.hasOne(Review, { foreignKey: "orderItemId" });
Review.belongsTo(orderItem, { foreignKey: "orderItemId" });

Event.hasMany(Review, { foreignKey: "eventId" });
Review.belongsTo(Event, { foreignKey: "eventId" });

export {
  User,
  Event_page,
  Event,
  Category,
  Ticket,
  orderItem,
  Payment,
  ticketOrder,
  CategoryEvent,
  Review,
};
