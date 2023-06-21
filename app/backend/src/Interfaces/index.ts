export type NewEntity<T> = Omit<T, 'id'>;

export type Payload = {
  email: string
  password: string
};

export type typeDecode = {
  email: string,
  password: string,
  role: string,
  iat: number,
  exp: number
};

export type TMatches = {
  id: number;
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: {
    nameTeam: string;
  },
  awayTeam: {
    nameTeam: string;
  },
};
