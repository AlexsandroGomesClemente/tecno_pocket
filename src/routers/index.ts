import { Router } from "express";
import * as userController from '../controllers/userController'
import * as productController from '../controllers/productsController'

const router = Router();


//Rotas para a session
router.post('/login', userController.login)
router.post('/register',userController.register)

//Rotas para os gerenciamentos
router.get('/products', productController.getAllProducts)
router.get('/products/:id',productController.getProduct)
router.post('/products/new',productController.newProduct)
router.put('/products/:id', productController.putClient)
router.delete('/products/:id', productController.deleteClient)



export default router 