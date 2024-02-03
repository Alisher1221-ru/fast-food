import {Router} from "express"
import {getimagess, getimages, postimages, updateimages, deleteimages} from '../controller/image.controller.js'
import authGuard from "../examination/Auth.guard.js"
import RoleGuard from "../examination/Role.guard.js"

const product_imagesRouter = Router()

product_imagesRouter.get('/:id', getimages)
product_imagesRouter.get('/', getimagess)
product_imagesRouter.post('/', authGuard, RoleGuard, postimages)
product_imagesRouter.patch('/:id', authGuard, RoleGuard, updateimages)
product_imagesRouter.delete('/:id', authGuard, RoleGuard, deleteimages)

export default product_imagesRouter
