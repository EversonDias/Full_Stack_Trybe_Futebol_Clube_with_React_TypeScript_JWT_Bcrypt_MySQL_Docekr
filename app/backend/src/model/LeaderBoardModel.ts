import ILeaderBoard from '../Interfaces/ILeaderBoard';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class LeaderBoardModel {
  private model = SequelizeMatch;
  name = '';
  totalPoints = 0;
  totalGames = 0;
  totalVictories = 0;
  totalDraws = 0;
  totalLosses = 0;
  goalsFavor = 0;
  goalsOwn = 0;

  leaderBoardDefault = () => {
    this.name = '';
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
  };

  points = (home: number, away: number, key: string) => {
    if (key === 'home') {
      if (home > away) {
        return 3;
      }
    } else if (away < home) {
      return 3;
    }
    if (home === away) {
      return 1;
    }
    return 0;
  };

  filterTeam = (
    { teams, key, id }: { teams:SequelizeMatch[], key: string, id: number },
  ) => (key === 'home'
    ? teams.filter(({ homeTeamId }) => homeTeamId === id)
    : teams.filter(({ awayTeamId }) => awayTeamId === id)) ;

  createTable = (list: SequelizeMatch[], data: ILeaderBoard, key: string) => {
    this.name = data.homeTeam.teamName;
    this.totalGames = list.length;
    list.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      this.totalPoints += this.points(homeTeamGoals, awayTeamGoals, key);
      this.totalVictories += this.points(homeTeamGoals, awayTeamGoals, key) === 3 ? 1 : 0;
      this.totalDraws += this.points(homeTeamGoals, awayTeamGoals, key) === 1 ? 1 : 0;
      this.totalLosses += this.points(homeTeamGoals, awayTeamGoals, key) === 0 ? 1 : 0;
      this.goalsFavor += homeTeamGoals;
      this.goalsOwn += awayTeamGoals;
    });
    return { name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn };
  };

  getHome = async () => {
    const teamsHome = await this.model
      .findAll({ where: { inProgress: false },
        include: [
          { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        ],
        attributes: ['homeTeamGoals', 'awayTeamGoals', 'homeTeamId'] });
    const data = (teamsHome as unknown as ILeaderBoard[])
      .map((dataValues) => {
        this.leaderBoardDefault();
        const currentTeam = this.filterTeam(
          { teams: teamsHome, key: 'home', id: (dataValues.homeTeamId as number) },
        );
        return this.createTable(currentTeam, dataValues, 'home');
      });
    return data;
  };

  getAway = async () => {
    const teamsHome = await this.model
      .findAll({ where: { inProgress: false },
        include: [
          { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
        attributes: ['homeTeamGoals', 'awayTeamGoals', 'awayTeamId'] });
    const data = (teamsHome as unknown as ILeaderBoard[])
      .map((dataValues) => {
        this.leaderBoardDefault();
        const currentTeam = this.filterTeam(
          { teams: teamsHome, key: 'away', id: (dataValues.homeTeamId as number) },
        );
        return this.createTable(currentTeam, dataValues, 'away');
      });
    return data;
  };
}
