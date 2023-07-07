import { User } from "./User";
import { Event_page } from "./Event_page";
import { Event } from "./Event";

User.hasMany(Event_page, { foreignKey: "userId" });
Event_page.belongsTo(User, { foreignKey: "userId" });

Event_page.hasMany(Event, { as: "Hosted by", foreignKey: "eventPageId" });
Event.belongsTo(Event_page, {
  as: "Hosted by",
  foreignKey: "eventPageId",
});

User.hasMany(Event, { foreignKey: "userId" });
Event.belongsTo(User, { foreignKey: "userId" });

export { User, Event_page, Event };
