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

// src/controllers/userController.ts
var userController_exports = {};
__export(userController_exports, {
  login: () => login,
  register: () => register
});
module.exports = __toCommonJS(userController_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  login,
  register
});
