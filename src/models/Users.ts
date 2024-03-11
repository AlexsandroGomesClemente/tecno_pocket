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
    nome: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    senha: {
      type: DataTypes.STRING,
    },
    token_session: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

export default Users;
