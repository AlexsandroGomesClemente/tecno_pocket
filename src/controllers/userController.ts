import Users from "../models/Users";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const login = async (req: Request, res: Response) => {
  const email = req.body.email as String
  const password = req.body.password as String

  const user = await Users.findAll({
    where: {
      email: email,
      senha: password,
    },
  });

  if (user.length === 0) {
    return res.status(400).send({
      message: "Usuario não cadastrado",
    });
  } else {
    return res.status(200).send({
      message: "Usuario logado com sucesso",
      user,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  const name = req.body.name as String
  const email = req.body.email as String
  const password = req.body.password as String

  const token = uuidv4();


  if (name !== "" && email !== "" && password !== "") {
    Users.create({
      nome: name,
      email,
      senha: password,
      token_session: token,
    });

    return res.status(200).send({
      message: "Usuario criado com sucesso",
      data: {
        name,
        email,
        password,
        token_session: token,
      },
    });
  }

  return res.status(400).send({
    message: "Erro ao cadastrar o usuario",
  });
};
