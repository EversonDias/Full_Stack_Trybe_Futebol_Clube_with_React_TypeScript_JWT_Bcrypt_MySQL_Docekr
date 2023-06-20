import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../model/TeamModel';
import StatusHTTP from '../utils/StatusHTTP';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  getAll = async () => {
    const response = await this.teamModel.findAll();
    return {
      status: StatusHTTP.success,
      data: response,
    };
  };

  getId = async (id: number) => {
    const response = await this.teamModel.findById(id);
    if (response !== null) {
      return {
        status: StatusHTTP.success,
        data: response,
      };
    }
    return {
      status: StatusHTTP.badRequest,
      data: { message: 'Error' },
    };
  };
}
