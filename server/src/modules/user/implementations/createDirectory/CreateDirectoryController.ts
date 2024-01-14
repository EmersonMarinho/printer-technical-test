import { Request, Response } from 'express';
import CreateDirectoryService from './CreateDirectoryService';

const directoryService = new CreateDirectoryService();

export default class DirectoryController {
    async create(request: Request, response: Response) {
        const { name, parentId } = request.body;
        const ownerId = request.userId;

        try {
            const directory = await directoryService.create({ name, ownerId, parentId });
            return response.status(201).json(directory);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const ownerId = request.userId;

        try {
            await directoryService.delete({ id, ownerId });
            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name } = request.body;
        const ownerId = request.userId;

        try {
            const directory = await directoryService.update({ id, name, ownerId });
            return response.json(directory);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async list(request: Request, response: Response) {
        const { parentId } = request.params;
        const ownerId = request.userId;

        try {
            const directories = await directoryService.list({ ownerId, parentId });
            return response.json(directories);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async listFiles(request: Request, response: Response) {
        const { parentId } = request.params;
        const ownerId = request.userId;

        try {
            const files = await directoryService.listFiles({ ownerId, parentId });
            return response.json(files);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async listUsers(request: Request, response: Response) {
        const ownerId = request.userId;

        try {
            const directories = await directoryService.listUsers(ownerId);
            return response.json(directories);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }
}
