import { DataTypes, Model } from 'sequelize'
import db from '.'
import User from './UserModel'

class File extends Model {
  declare id: string
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

File.belongsTo(User, {
    foreignKey: 'userId',
    as: 'owner',
  });

export default File
