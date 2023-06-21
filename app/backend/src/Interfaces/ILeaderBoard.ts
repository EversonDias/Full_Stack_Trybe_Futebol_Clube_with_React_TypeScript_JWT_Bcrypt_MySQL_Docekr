export default interface ILeaderBoard {
  homeTeamGoals: number;
  awayTeamGoals: number;
  homeTeamId?: number;
  awayTeamId?: number;
  homeTeam?: {
    teamName: string;
  },
  awayTeam?: {
    teamName: string;
  };
}
