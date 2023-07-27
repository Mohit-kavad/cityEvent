"use strict";

import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "./connection";

export type point = {
  type: string;
  coordinates: string[];
};

class Event extends Model<
  InferAttributes<Event>,
  InferCreationAttributes<Event>
> {
  declare id: number;
  declare userId: number;
  declare eventTitle: string;
  declare eventImage: string;
  declare description: string;
  declare startTime: string;
  declare endTime: string;
  declare location: point;
  declare eventPageId: number;
  declare categoryId: number[];
}

Event.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOMETRY("POINT"),
      allowNull: false,
    },
    eventPageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Event",
  }
);

export { Event };
