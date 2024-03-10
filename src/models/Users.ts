import { Model, DataTypes } from "sequelize";
import sequelize from "../config/mysql";

export interface UserInstance extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  session_token: string;
}

const Users = sequelize.define<UserInstance>(
  "Users",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    session_token: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

export default Users;
