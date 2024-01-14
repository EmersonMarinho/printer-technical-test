import { DataTypes, Model } from 'sequelize';
import db from '.';
import File from './FileModel';

class Directory extends Model {
  declare id: string;
  declare name: string;
  declare parentId: string | null;
  declare ownerId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    }
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




export default Directory;
