"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/models/Products.ts
var Products_exports = {};
__export(Products_exports, {
  default: () => Products_default
});
module.exports = __toCommonJS(Products_exports);
var import_sequelize2 = require("sequelize");

// src/config/mysql.ts
var import_sequelize = require("sequelize");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var sequelize = new import_sequelize.Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  "Tecno123",
  {
    port: parseInt(process.env.MYSQL_PORT),
    dialect: "mysql",
    host: process.env.MYSQL_URL
  }
);
var mysql_default = sequelize;

// src/models/Products.ts
var Products = mysql_default.define(
  "Products",
  {
    id: {
      primaryKey: true,
      type: import_sequelize2.DataTypes.INTEGER
    },
    titulo: {
      type: import_sequelize2.DataTypes.STRING
    },
    descricao: {
      type: import_sequelize2.DataTypes.STRING
    },
    preco: {
      type: import_sequelize2.DataTypes.FLOAT
    },
    categoria: {
      type: import_sequelize2.DataTypes.STRING
    },
    marca: {
      type: import_sequelize2.DataTypes.STRING
    },
    imagem: {
      type: import_sequelize2.DataTypes.BLOB
    }
  },
  {
    tableName: "produtos",
    timestamps: false
  }
);
var Products_default = Products;
