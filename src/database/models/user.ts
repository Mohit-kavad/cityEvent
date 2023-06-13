import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "./connection";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare username: string;
  declare password: string;
  declare mobile: string;
  declare dateOfBirth: Date;
  declare gender: string;
  declare address: string;
  declare role: string;
  declare profilePicture: string;
}
User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export { User };
