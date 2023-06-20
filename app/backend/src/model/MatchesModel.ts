import { TMatches } from '../Interfaces';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchesModel {
  private model = SequelizeMatch;
  private sequelizeTeam = SequelizeTeam;

  findAll = async (): Promise<TMatches[]> => {
    const result = await this
      .model.findAll({
        include: [
          { model: SequelizeTeam, as: 'home_team', attributes: { exclude: ['id'] } },
          { model: SequelizeTeam, as: 'away_team', attributes: { exclude: ['id'] } },
        ],
      });
    const data = result.map(({ dataValues }) => dataValues);
    return data as any;
  };
}
