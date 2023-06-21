import LeaderBoardModel from '../model/LeaderBoardModel';
import StatusHTTP from '../utils/StatusHTTP';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel = new LeaderBoardModel(),
  ) {}

  getHome = async () => {
    const result = await this.leaderBoardModel.getHome();
    return { status: StatusHTTP.success, data: result };
  };

  getAway = async () => {
    const result = await this.leaderBoardModel.getAway();
    return { status: StatusHTTP.success, data: result };
  };

  getAllTeams = async () => {
    const result = await this.leaderBoardModel.getAllTeams();
    return { status: StatusHTTP.success, data: result };
  };
}
