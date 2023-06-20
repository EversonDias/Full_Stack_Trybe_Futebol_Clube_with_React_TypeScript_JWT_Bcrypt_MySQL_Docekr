import { InferAttributes, Model, CreationOptional, DataTypes } from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

export default class SequelizeMatch extends Model<InferAttributes<SequelizeMatch>,
InferAttributes<SequelizeMatch>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatch.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'match',
    timestamps: false,
    underscored: true,
  },
);

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'home_team_id',
  as: 'away_team',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'away_team_id',
  as: 'home_team',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
