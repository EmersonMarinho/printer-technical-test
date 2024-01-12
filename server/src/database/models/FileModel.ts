import { DataTypes, Model } from 'sequelize'
import db from '.'
import User from './UserModel'
import Directory from './DirectoryModel'

class File extends Model {
  declare id: string
  declare directoryId: string
  declare filename: string
  declare filepath: string
  declare ownerId: string
}

File.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    directoryId: { 
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'directories',
        key: 'id',
      },
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize: db,
    modelName: 'file',
    timestamps: true,
  },
)

File.belongsTo(Directory, {
  foreignKey: 'directoryId',
  as: 'directory',
})

File.hasMany(User, {
  foreignKey: 'userId',
  as: 'ownedFiles',
})

export default File
