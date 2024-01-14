import Directory from "../../../../database/models/DirectoryModel";
import File from "../../../../database/models/FileModel";
import User from "../../../../database/models/UserModel";

export default interface ICreateDirectoryService {
    create(data: { name: string; ownerId: string; parentId?: string }): Promise<Directory>;
    delete(data: { id: string; ownerId: string }): Promise<void>;
    update(data: { id: string; name: string; ownerId: string }): Promise<Directory>;
    list(data: { ownerId: string; parentId?: string }): Promise<Directory[]>;
    listFiles(data: { ownerId: string; parentId?: string }): Promise<File[]>;
    listUsers(data: { ownerId: string; parentId?: string }): Promise<User[]>;
}

export default class CreateDirectoryService implements ICreateDirectoryService {
    async create(data: { name: string; ownerId: string; parentId?: string }): Promise<Directory> {
        const { name, ownerId, parentId } = data;

        const directory = await Directory.create({
            name,
            ownerId,
            parentId
        });

        return directory;
    }

    async delete(data: { id: string; ownerId: string }): Promise<void> {
        const { id, ownerId } = data;

        await Directory.destroy({ where: { id, ownerId } });
    }

    async update(data: { id: string; name: string; ownerId: string }): Promise<Directory> {
        const { id, name, ownerId } = data;

        const directory = await Directory.findOne({ where: { id, ownerId } });

        if (!directory) {
            throw new Error('Directory not found');
        }

        directory.name = name;

        await directory.save();

        return directory;
    }

    async list(data: { ownerId: string; parentId?: string }): Promise<Directory[]> {
        const { ownerId, parentId } = data;

        const directories = await Directory.findAll({ where: { ownerId, parentId } });

        return directories;
    }

    async listFiles(data: { ownerId: string; parentId?: string }): Promise<File[]> {
        const { ownerId, parentId } = data;

        const files = await File.findAll({ where: { ownerId, parentId } });

        return files;
    }

    async listByOwner(ownerId: string): Promise<Directory[]> {
        const directories = await Directory.findAll({
            where: { ownerId }
        });
        
        return directories;
    }
    
}