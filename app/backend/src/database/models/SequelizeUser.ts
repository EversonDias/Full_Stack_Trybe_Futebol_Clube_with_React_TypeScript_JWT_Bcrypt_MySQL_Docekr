import { InferAttributes, Model, CreationOptional, DataTypes } from 'sequelize';
import db from '.';

export default class SequelizeUser extends Model<InferAttributes<SequelizeUser>,
InferAttributes<SequelizeUser>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string;
}

SequelizeUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);
