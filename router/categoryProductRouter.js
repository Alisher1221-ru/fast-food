import {Router} from "express"
import { createdcategorys_products, getcategorys_productss, updatecategorys_products, deletecategorys_products } from "../controller/category_products.controllet.js"
import authGuard from "../examination/Auth.guard.js"
import RoleGuard from "../examination/Role.guard.js"

const categoryProductsServer = Router()

categoryProductsServer.get('/', getcategorys_productss)
categoryProductsServer.post('/', authGuard, RoleGuard, createdcategorys_products)
categoryProductsServer.patch('/', authGuard, RoleGuard, updatecategorys_products)
categoryProductsServer.delete('/', authGuard, RoleGuard,deletecategorys_products )

export default categoryProductsServer
