import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "./connection";

class Ticket extends Model<
  InferAttributes<Ticket>,
  InferCreationAttributes<Ticket>
> {
  declare id: number;
  declare ticketName: string;
  declare ticketPrice: number;
  declare totalTickets: number;
  declare availableTickets: number;
  declare ticketDescription: string;
  declare eventId: number;
}

Ticket.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    ticketName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticketPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalTickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableTickets: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    ticketDescription: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Ticket",
  }
);

export { Ticket };
