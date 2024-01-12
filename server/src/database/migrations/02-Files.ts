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
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('files')
  },
}
