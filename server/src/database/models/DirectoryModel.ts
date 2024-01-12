import { DataTypes, Model } from 'sequelize';
import db from '.';
import User from './UserModel';

class Directory extends Model {
  declare id: string;
  declare name: string;
  declare parentId: string | null;
  declare ownerId: string;
}

Directory.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'directories', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize: db,
    modelName: 'directory',
    timestamps: true,
  },
);

Directory.hasMany(Directory, {
  foreignKey: 'parentId',
  as: 'subdirectories',
});

Directory.belongsTo(Directory, {
  foreignKey: 'parentId',
  as: 'parent',
});

Directory.belongsTo(User, {
    foreignKey: 'ownerId',
    as: 'owner'
  });

export default Directory;
