import Products from "../models/Products";
import { Request, Response } from "express";

export const getAllProducts = async (req:Request, res: Response) => {
  const products = await Products.findAll();


  if (products.length === 0) {
    return res.status(200).send({
      message: "Sem produtos cadastrado",
      produtos: products,
    });
  } else {
    return res.status(200).send({
      message: "Produtos cadastrados",
      produtos: products,
    });
  }
};

export const getProduct = async (req:Request, res: Response) => {
    const {id} = req.body 

    const products = await Products.findAll({
        where :{
            id: id
        }
    });
  
    if (products.length === 0) {
      return res.status(400).send({
        message: "Produto não encontrado",
      });
    } else {
      return res.status(200).send({
        message: "Produto encontrado",
        clients: products,
      });
    }
  };

export const newProduct = async (req: Request, res: Response) => {
  const { titulo, descricao, preco, marca, categoria, imagem } = req.body;

  await Products.create({
    titulo,
    descricao,
    preco,
    categoria,
    marca,
    imagem,
  });

  return res.status(200).send({
    message: "Produto criado com sucesso",
  });
};

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  const productRemove = await Products.findByPk(id);

  if (productRemove) {
    await productRemove.destroy();

    return res.status(200).send({
      message: "Produto  deletado com sucesso",
    });
  }

  return res.status(400).send({
    message: "Erro ao deletar o produto",
  });
};

export const putClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, descricao, preco, marca, categoria, imagem } = req.body;

  await Products.update(
    { titulo, descricao, preco, marca, categoria, imagem },
    {
      where: {
        id: id,
      },
    }
  );

  return res.status(200).send({
    message: "Dados do produto alterados com sucesso",
  });
};
