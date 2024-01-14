import { Model, QueryInterface, DataTypes } from 'sequelize'
import IFile from '../Interfaces/IFile'

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IFile>>('files', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      filename: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      filepath: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      parentId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'directories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_Folder: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      size: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('files')
  },
}
