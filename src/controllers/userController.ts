import Users from "../models/Users";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await Users.findAll({
    where: {
      email: email,
      password: password,
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
  const { name, email, password } = req.body;
  const token = "token312313"

  if (name !== "" && email !== "" && password !== "") {
    Users.create({
      nome:name,
      email,
      senha :password,
      token_session: token
    });

    return res.status(200).send({
      message: "Usuario criado com sucesso",
      data: {
        nome:name,
        email:email,
        senha: password,
        token_session: token
      },
    });
  }

  return res.status(400).send({
    message: "Erro ao cadastrar o usuario",
  });
};
