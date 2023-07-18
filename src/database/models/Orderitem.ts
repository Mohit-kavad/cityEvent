"use strict";
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "./connection";

class orderItem extends Model<
  InferAttributes<orderItem>,
  InferCreationAttributes<orderItem>
> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare phone: number;
  declare ticketPrice: number;
  declare tickeTypeId: number;
  declare ticketOrderId: number;
}

orderItem.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ticketPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tickeTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ticketOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "orderItem",
  }
);

export { orderItem };
