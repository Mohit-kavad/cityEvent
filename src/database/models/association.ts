import { Event_page } from "./Event_page";
import { User } from "./User";

User.hasMany(Event_page, { foreignKey: "userId" });
Event_page.belongsTo(User, { foreignKey: "userId" });

export { User, Event_page };
