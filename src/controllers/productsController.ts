import Products from "../models/Products";
import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Busca todos os produtos no banco de dados
    const products = await Products.findAll();

    // Percorre a lista de produtos e adiciona a URL da imagem a cada produto
    const productsWithImageUrl = products.map((product) => ({
      ...product.dataValues,
      imagemUrl: `${req.protocol}://${req.get("host")}${product.imagem}`,
    }));

    // Verifica se existem produtos cadastrados
    if (productsWithImageUrl.length === 0) {
      return res.status(200).send({
        message: "Sem produtos cadastrados",
        produtos: productsWithImageUrl,
      });
    } else {
      return res.status(200).send({
        message: "Produtos cadastrados",
        produtos: productsWithImageUrl,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Erro ao buscar produtos",
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.body;

  const products = await Products.findAll({
    where: {
      id: id,
    },
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
