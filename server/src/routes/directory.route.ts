import { Router } from 'express';
import CreateDirectoryController from '../modules/user/implementations/createDirectory/CreateDirectoryController';
import authenticate from '../modules/middlewares/VerifyToken'; // The path to your authentication middleware

const directoryRouter = Router();

const createDirectoryController = new CreateDirectoryController();

directoryRouter.post('/directories', authenticate, createDirectoryController.create);

directoryRouter.delete('/directories/:id', authenticate, createDirectoryController.delete);

directoryRouter.patch('/directories/:id', authenticate, createDirectoryController.update);

directoryRouter.get('/directories', authenticate, createDirectoryController.list);

directoryRouter.get('/directories/:parentId/files', authenticate, createDirectoryController.listFiles);

directoryRouter.get('/users', authenticate, createDirectoryController.listUsers);

export default directoryRouter;
