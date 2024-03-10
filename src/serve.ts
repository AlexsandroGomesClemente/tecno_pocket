import express, { Request, Response } from "express";
import router from "./routers/index";
import dotenv from "dotenv";
import cors from "cors";



const server = express();
dotenv.config();
server.use(express.json());
server.use(cors());
server.use(router);

server.listen(process.env.PORT, () => {
  console.log("Servidor rotando na porta:", process.env.PORT ,'😎');
});
