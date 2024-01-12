import { Model, QueryInterface, DataTypes } from 'sequelize'
import IDirectory from '../Interfaces/IDirectory'

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IDirectory>>('directories', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
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
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('directories')
  },
}