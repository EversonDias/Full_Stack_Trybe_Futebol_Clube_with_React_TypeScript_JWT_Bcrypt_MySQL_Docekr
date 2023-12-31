import { TeamStatistic } from '../Interfaces';
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
    } else if (away > home) {
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

  buildTeam = () => ({
    name: this.name,
    totalPoints: this.totalPoints,
    totalGames: this.totalGames,
    totalVictories: this.totalVictories,
    totalDraws: this.totalDraws,
    totalLosses: this.totalLosses,
    goalsFavor: this.goalsFavor,
    goalsOwn: this.goalsOwn,
    goalsBalance: this.goalsFavor - this.goalsOwn,
    efficiency: ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2),
  });

  createDefault = (list: SequelizeMatch[], key: string) => {
    list.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      this.totalPoints += this.points(homeTeamGoals, awayTeamGoals, key);
      this.totalVictories += this.points(homeTeamGoals, awayTeamGoals, key) === 3 ? 1 : 0;
      this.totalDraws += this.points(homeTeamGoals, awayTeamGoals, key) === 1 ? 1 : 0;
      this.totalLosses += this.points(homeTeamGoals, awayTeamGoals, key) === 0 ? 1 : 0;
    });
  };

  createTable = (list: SequelizeMatch[], data: ILeaderBoard, key: string) => {
    if (key === 'home') {
      this.name = data.homeTeam?.teamName || '';
      list.forEach(({ homeTeamGoals, awayTeamGoals }) => {
        this.goalsFavor += homeTeamGoals;
        this.goalsOwn += awayTeamGoals;
      });
    } else {
      this.name = data.awayTeam?.teamName || '';
      list.forEach(({ homeTeamGoals, awayTeamGoals }) => {
        this.goalsFavor += awayTeamGoals;
        this.goalsOwn += homeTeamGoals;
      });
    }
    this.createDefault(list, key);
    this.totalGames = list.length;
    return this.buildTeam();
  };

  order = (listOfTeams: TeamStatistic[]) => {
    const result = listOfTeams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return 0;
    });
    return result;
  };

  removeDuplicates = (list: TeamStatistic[]) => list.filter((TeamCurrent, index, listOrigen) =>
    index === listOrigen.findIndex((teamOrigen) =>
      JSON.stringify(teamOrigen) === JSON.stringify(TeamCurrent)));

  getHome = async () => {
    const teamsHome = await this.model
      .findAll({ where: { inProgress: false },
        include: [
          { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        ],
        attributes: ['homeTeamGoals', 'awayTeamGoals', 'homeTeamId'],
      });
    const data = (teamsHome as unknown as ILeaderBoard[])
      .map((dataValues) => {
        this.leaderBoardDefault();
        const currentTeam = this.filterTeam(
          { teams: teamsHome, key: 'home', id: (dataValues.homeTeamId as number) },
        );
        return this.createTable(currentTeam, dataValues, 'home');
      });
    const filterData = this.removeDuplicates(data);
    return this.order((filterData as unknown as TeamStatistic[]));
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
          { teams: teamsHome, key: 'away', id: (dataValues.awayTeamId as number) },
        );
        return this.createTable(currentTeam, dataValues, 'away');
      });
    const filterData = this.removeDuplicates(data);
    return this.order((filterData as unknown as TeamStatistic[]));
  };

  removerDuplicateAllTeam = (StatisticHome: TeamStatistic, StatisticAway: TeamStatistic) => ({
    name: StatisticHome.name,
    totalPoints: StatisticHome.totalPoints + StatisticAway.totalPoints,
    totalGames: StatisticHome.totalGames + StatisticAway.totalGames,
    totalVictories: StatisticHome.totalVictories + StatisticAway.totalVictories,
    totalDraws: StatisticHome.totalDraws + StatisticAway.totalDraws,
    totalLosses: StatisticHome.totalLosses + StatisticAway.totalLosses,
    goalsFavor: StatisticHome.goalsFavor + StatisticAway.goalsFavor,
    goalsOwn: StatisticHome.goalsOwn + StatisticAway.goalsOwn,
    goalsBalance: (StatisticHome.goalsFavor + StatisticAway.goalsFavor)
      - (StatisticHome.goalsOwn + StatisticAway.goalsOwn),
    efficiency: (((StatisticHome.totalPoints + StatisticAway.totalPoints)
      / ((StatisticHome.totalGames + StatisticAway.totalGames) * 3)) * 100).toFixed(2),
  });

  getAllTeams = async () => {
    const teamHome = await this.getHome();
    const teamAway = await this.getAway();
    const data: TeamStatistic[] = [];
    teamHome.forEach((StatisticHome) => {
      const [StatisticAway] = teamAway.filter(({ name }) => name === StatisticHome.name);
      data.push(this.removerDuplicateAllTeam(StatisticHome, StatisticAway));
    });
    return this.order(data);
  };
}
