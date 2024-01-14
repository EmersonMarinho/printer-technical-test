import { Model, QueryInterface, DataTypes } from 'sequelize'
import ISharedFile from '../Interfaces/ISharedFile'

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ISharedFile>>('sharedFiles', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      fileId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'files',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ownerId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sharedWithId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      permission: {
        type: DataTypes.ENUM('READ'),
        allowNull: false,
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('sharedFiles')
  },
}