import {Router} from "express"
import {createdCart, getCarts, getCart, updateCart, deleteCart} from '../controller/cart.controller.js'
import authGuard from "../examination/Auth.guard.js"
import RoleGuard from "../examination/Role.guard.js"

const CartServer = Router()

CartServer.get('/:id',authGuard, getCart)
CartServer.get('/',authGuard, getCarts)
CartServer.post('/', authGuard, createdCart)
CartServer.patch('/:id', authGuard, updateCart)
CartServer.delete('/:id', authGuard, deleteCart)

export default CartServer
