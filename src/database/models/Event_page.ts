import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "./connection";

class Event_page extends Model<
  InferAttributes<Event_page>,
  InferCreationAttributes<Event_page>
> {
  declare id: number;
  declare pageName: string;
  declare userId: number;
}

Event_page.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    pageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Event_page",
  }
);

export { Event_page };
