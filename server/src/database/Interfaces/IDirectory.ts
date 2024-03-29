export default interface IDirectory {
    id: string
    name: string
    parentId: string
    ownerId: string
    createdAt?: Date
    updatedAt?: Date
}