import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { CreateUserDto } from "@/dtos/user.dto";
import { Routes } from "@/interface/routes.interface";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";

export class UserRoute implements Routes{
    public path = '/user';
    public router = Router();
    public user = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`,ValidationMiddleware(CreateUserDto), this.user.createUser);
        this.router.get(`${this.path}/getAll`, this.user.getUsers);
        this.router.get(`${this.path}/getById/:userId`, this.user.getUserById);
        this.router.put(`${this.path}/update/:userId`, ValidationMiddleware(CreateUserDto), this.user.updateUser);
        this.router.delete(`${this.path}/delete/:userId`,this.user.deleteUser);
    }
}