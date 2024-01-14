import { Request, Response } from "express";
import CreateUserService from "./CreateUserService";

const userService = new CreateUserService();

export default class CreateUserController {
    async create(request: Request, response: Response) {
        const { email, password, name } = request.body;

        const user = await userService.create({ email, password, name });

        return response.json(user);
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const user = await userService.login({ email, password });

        return response.json(user);
    }
}    