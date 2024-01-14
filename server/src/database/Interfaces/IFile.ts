export default interface IFile {
  id: string
  filename: string
  filepath: string
  userId: string
  parentId: string
  is_Folder: boolean
  size: number
  createdAt?: Date
  updatedAt?: Date
}
