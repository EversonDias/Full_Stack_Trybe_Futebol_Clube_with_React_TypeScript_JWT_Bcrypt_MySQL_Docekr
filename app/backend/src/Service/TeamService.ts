import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../model/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  getAll = async () => {
    const response = await this.teamModel.findAll();
    return {
      status: 'SUCCESS',
      data: response,
    };
  };

  getId = async (id: number) => {
    const response = await this.teamModel.findById(id);
    return {
      status: 'SUCCESS',
      data: response,
    };
  };
}
