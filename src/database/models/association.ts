import { User } from "./User";
import { Event_page } from "./Event_page";
import { Event } from "./Event";

User.hasMany(Event_page, { foreignKey: "userId" });
Event_page.belongsTo(User, { foreignKey: "userId" });

Event_page.hasMany(Event, { foreignKey: "eventPageId" });
Event.belongsTo(Event_page, { foreignKey: "eventPageId" });

export { User, Event_page, Event };
