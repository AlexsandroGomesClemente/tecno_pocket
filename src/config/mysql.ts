import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB as string,
  process.env.MYSQL_USER as string,
  'Tecno123',
  {
    port: parseInt(process.env.MYSQL_PORT as string),
    dialect: "mysql",
    host: process.env.MYSQL_URL as string 
  }
);

export default sequelize;
