import { Router } from "express";
import { getUser, getUsers, login, signup, refresh, logout, updateUser, deleteUser, meUser } from "../controller/users_controller.js";
import authGuard from "../examination/Auth.guard.js";
import RoleGuard from '../examination/Role.guard.js'
const roleServers = Router()

roleServers.get('/:id', authGuard, getUser)
roleServers.get('/', authGuard, getUsers)
roleServers.post('/login', login)
roleServers.post('/signup', signup)
roleServers.post('/refresh', refresh)
roleServers.post('/me', authGuard, meUser)
roleServers.post('/logout', authGuard, logout)
roleServers.patch('/update/:id', authGuard, updateUser)
roleServers.delete('/delete/:id', authGuard, deleteUser)

export default roleServers
