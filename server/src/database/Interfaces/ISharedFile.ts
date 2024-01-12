export default interface ISharedFile {
    id: string
    fileId: string
    ownerId: string
    sharedWithId: string
    permission: string
}