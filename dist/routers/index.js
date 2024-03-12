"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/routers/index.ts
var routers_exports = {};
__export(routers_exports, {
  default: () => routers_default
});
module.exports = __toCommonJS(routers_exports);
var import_express = require("express");

// src/models/Users.ts
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

// src/models/Users.ts
var Users = mysql_default.define(
  "Users",
  {
    id: {
      primaryKey: true,
      type: import_sequelize2.DataTypes.INTEGER
    },
    nome: {
      type: import_sequelize2.DataTypes.STRING
    },
    email: {
      type: import_sequelize2.DataTypes.STRING
    },
    senha: {
      type: import_sequelize2.DataTypes.STRING
    },
    token_session: {
      type: import_sequelize2.DataTypes.STRING
    }
  },
  {
    tableName: "usuarios",
    timestamps: false
  }
);
var Users_default = Users;

// src/controllers/userController.ts
var import_uuid = require("uuid");
var login = (req, res) => __async(void 0, null, function* () {
  const email = req.body.email;
  const password = req.body.password;
  const user = yield Users_default.findAll({
    where: {
      email,
      senha: password
    }
  });
  if (user.length === 0) {
    return res.status(400).send({
      message: "Usuario n\xE3o cadastrado"
    });
  } else {
    return res.status(200).send({
      message: "Usuario logado com sucesso",
      user
    });
  }
});
var register = (req, res) => __async(void 0, null, function* () {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const token = (0, import_uuid.v4)();
  if (name !== "" && email !== "" && password !== "") {
    Users_default.create({
      nome: name,
      email,
      senha: password,
      token_session: token
    });
    return res.status(200).send({
      message: "Usuario criado com sucesso",
      data: {
        name,
        email,
        password,
        token_session: token
      }
    });
  }
  return res.status(400).send({
    message: "Erro ao cadastrar o usuario"
  });
});

// src/models/Products.ts
var import_sequelize3 = require("sequelize");
var Products = mysql_default.define(
  "Products",
  {
    id: {
      primaryKey: true,
      type: import_sequelize3.DataTypes.INTEGER
    },
    titulo: {
      type: import_sequelize3.DataTypes.STRING
    },
    descricao: {
      type: import_sequelize3.DataTypes.STRING
    },
    preco: {
      type: import_sequelize3.DataTypes.FLOAT
    },
    categoria: {
      type: import_sequelize3.DataTypes.STRING
    },
    marca: {
      type: import_sequelize3.DataTypes.STRING
    },
    imagem: {
      type: import_sequelize3.DataTypes.BLOB
    }
  },
  {
    tableName: "produtos",
    timestamps: false
  }
);
var Products_default = Products;

// src/controllers/productsController.ts
var getAllProducts = (req, res) => __async(void 0, null, function* () {
  try {
    const products = yield Products_default.findAll();
    const productsWithImageUrl = products.map((product) => __spreadProps(__spreadValues({}, product.dataValues), {
      imagemUrl: `${req.protocol}://${req.get("host")}${product.imagem}`
    }));
    if (productsWithImageUrl.length === 0) {
      return res.status(200).send({
        message: "Sem produtos cadastrados",
        produtos: productsWithImageUrl
      });
    } else {
      return res.status(200).send({
        message: "Produtos cadastrados",
        produtos: productsWithImageUrl
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Erro ao buscar produtos"
    });
  }
});
var getProduct = (req, res) => __async(void 0, null, function* () {
  const { id } = req.body;
  const products = yield Products_default.findAll({
    where: {
      id
    }
  });
  if (products.length === 0) {
    return res.status(400).send({
      message: "Produto n\xE3o encontrado"
    });
  } else {
    return res.status(200).send({
      message: "Produto encontrado",
      clients: products
    });
  }
});
var newProduct = (req, res) => __async(void 0, null, function* () {
  const { titulo, descricao, preco, marca, categoria, imagem } = req.body;
  yield Products_default.create({
    titulo,
    descricao,
    preco,
    categoria,
    marca,
    imagem
  });
  return res.status(200).send({
    message: "Produto criado com sucesso"
  });
});
var deleteClient = (req, res) => __async(void 0, null, function* () {
  const { id } = req.params;
  const productRemove = yield Products_default.findByPk(id);
  if (productRemove) {
    yield productRemove.destroy();
    return res.status(200).send({
      message: "Produto  deletado com sucesso"
    });
  }
  return res.status(400).send({
    message: "Erro ao deletar o produto"
  });
});
var putClient = (req, res) => __async(void 0, null, function* () {
  const { id } = req.params;
  const { titulo, descricao, preco, marca, categoria, imagem } = req.body;
  yield Products_default.update(
    { titulo, descricao, preco, marca, categoria, imagem },
    {
      where: {
        id
      }
    }
  );
  return res.status(200).send({
    message: "Dados do produto alterados com sucesso"
  });
});

// src/routers/index.ts
var router = (0, import_express.Router)();
router.post("/login", login);
router.post("/register", register);
router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);
router.post("/products/new", newProduct);
router.put("/products/:id", putClient);
router.delete("/products/:id", deleteClient);
var routers_default = router;
