import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  findAll = async (): Promise<ITeam[]> => {
    const data = await this.model.findAll();
    return data.map(({ id, teamName }) => ({ id, teamName }));
  };

  findById = async (id: number): Promise<ITeam | null> => {
    const data = await this.model.findByPk(id);
    if (data === null) return null;
    return data;
  };
}
