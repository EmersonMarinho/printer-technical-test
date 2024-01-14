import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import db from '.'
import File from './FileModel'
import Directory from './DirectoryModel'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  checkPassword(password: string) {
      throw new Error("Method not implemented.")
  }
  declare id: CreationOptional<string>
  declare name: string
  declare email: string
  declare password: CreationOptional<string>
  declare role: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['ADMIN', 'OWNER', 'GUEST'],
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    timestamps: true,
  },
)

User.hasMany(File, {
    foreignKey: 'userId',
    as: 'ownedFiles'
  });

User.hasMany(Directory, {
    foreignKey: 'ownerId',
    as: 'ownedDirectories'
  });

Directory.belongsTo(User, {
    foreignKey: 'ownerId',
    as: 'owner'
});
  

export default User
