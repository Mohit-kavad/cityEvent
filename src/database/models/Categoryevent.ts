import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "./connection";

class CategoryEvent extends Model<
  InferAttributes<CategoryEvent>,
  InferCreationAttributes<CategoryEvent>
> {
  declare id: number;
  declare categoryId: number;
  declare eventId: number;
}

CategoryEvent.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CategoryEvent",
  }
);

export { CategoryEvent };
