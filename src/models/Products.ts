import { Model, DataTypes } from "sequelize";
import sequelize from "../config/mysql";

export interface ProductsInstance extends Model {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  categoria: string;
  marca: string;
  imagem: string;
}

const Products = sequelize.define<ProductsInstance>(
  "Products",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    titulo: {
      type: DataTypes.STRING,
    },
    descricao: {
      type: DataTypes.STRING,
    },
    preco: {
      type: DataTypes.FLOAT,
    },
    categoria: {
      type: DataTypes.STRING,
    },
    marca: {
      type: DataTypes.STRING,
    },
    imagem: {
      type: DataTypes.BLOB,
    },
  },
  {
    tableName: "produtos",
    timestamps: false,
  }
);

export default Products;
