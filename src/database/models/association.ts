import { User } from "./User";
import { Event_page } from "./Event_page";
import { Event } from "./Event";
import { Category } from "./Category";
import { Ticket } from "./Ticket";

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
});
Category.belongsToMany(Event, {
  through: "CategoryEvnet",
  foreignKey: "categoryId",
  otherKey: "eventId",
});

Event.hasMany(Ticket, {
  foreignKey: "eventId",
});
Ticket.belongsTo(Event, { foreignKey: "eventId" });

export { User, Event_page, Event, Category, Ticket };
