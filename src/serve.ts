import express, { Request, Response } from "express";
import path from "path";
import router from "./routers/index";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

// Configure o multer para armazenar as imagens no servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const server = express();
dotenv.config();
server.use(cors());
server.use(express.json());
server.use(router);
server.use(express.static('public'))

// Rota para lidar com o upload da imagem
server.post("/uploadImage", upload.single("imagem"), async (req: any, res) => {
  try {
    const imageUrl = `/upload/${req.file.filename}`;
    res.send(imageUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao fazer upload do arquivo");
  }
});

server.listen(process.env.PORT, () => {
  console.log("Servidor rotando na porta:", process.env.PORT, "😎");
});
