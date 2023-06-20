import { DataTypes, QueryInterface, Model } from "sequelize";
import {IMatcher} from "../../Interfaces/matches/IMatcher";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatcher>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'home_team_id',
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'home_team_goals',
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'away_team_id',
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'in_progress',
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches')
  }
}