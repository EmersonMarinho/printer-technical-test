import { Router } from 'express';
import CreateUserController from '../modules/user/implementations/createUser/CreateUserController';

const userRouter = Router();

const userController = new CreateUserController();

userRouter.post('/create-account', userController.create);

userRouter.post('/login', userController.login);

export { userRouter };