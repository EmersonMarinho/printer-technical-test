import { DataTypes, Model } from 'sequelize';
import db from '.';
import User from './UserModel';
import File from './FileModel';

class SharedFile extends Model {
  declare id: string;
  declare fileId: string;
  declare ownerId: string;
  declare sharedWithId: string; 
  declare permission: string; 
}

SharedFile.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fileId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'files',
        key: 'id',
      },
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    sharedWithId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    permission: {
      type: DataTypes.ENUM("READ", "EDIT", "DELETE"),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'sharedFile',
    timestamps: true,
  },
);

export default SharedFile;
