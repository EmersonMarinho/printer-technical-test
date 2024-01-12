import { DataTypes, Model } from 'sequelize'
import db from '.'

class File extends Model {
  declare id: string
  declare filename: string
  declare filepath: string
  declare userId: string
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
    userId: {
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

export default File
