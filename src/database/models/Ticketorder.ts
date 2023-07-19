"use strict";
"use strict";
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "./connection";

class ticketOrder extends Model<
  InferAttributes<ticketOrder>,
  InferCreationAttributes<ticketOrder>
> {
  declare id: number;
  declare ticketStatus: string;
  declare totalAmount: number;
  declare registrationDate: Date;
}

ticketOrder.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    ticketStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ticketOrder",
  }
);

export { ticketOrder };
