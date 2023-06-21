const listStatistics = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 9,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Internacional"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  },
  {
    "id": 3,
    "homeTeamId": 4,
    "homeTeamGoals": 3,
    "awayTeamId": 11,
    "awayTeamGoals": 0,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "teamName": "Napoli-SC"
    }
  },
  {
    "id": 4,
    "homeTeamId": 3,
    "homeTeamGoals": 0,
    "awayTeamId": 2,
    "awayTeamGoals": 0,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Botafogo"
    },
    "awayTeam": {
      "teamName": "Bahia"
    }
  },
]

const buildList = (l: typeof listStatistics, type: string) => {
  if (type === 'home') {
    return l.map((i) => ({
      id: i.id,
      homeTeamId: i.homeTeamId,
      homeTeamGoals: i.homeTeamGoals,
      awayTeamGoals: i.awayTeamGoals,
      homeTeam: i.homeTeam,
    }))
  }
  return l.map((i) => ({
    id: i.id,
    awayTeamId: i.awayTeamId,
    homeTeamGoals: i.homeTeamGoals,
    awayTeamGoals: i.awayTeamGoals,
    awayTeam: i.awayTeam,
  }))
  
}

const listTeamsHomeMock = buildList(listStatistics, 'home');
const listTeamsAwayMock = buildList(listStatistics, 'away');


const listTeamsHome = [
  {
    name: 'Corinthians',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 0,
    goalsBalance: 3,
    efficiency: '100.00'
  },
  {
    name: 'São Paulo',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33'
  },
  {
    name: 'Internacional',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33'
  },
  {
    name: 'Botafogo',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '33.33'
  }
]

const listTeamsAway = [
  {
    name: 'Grêmio',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33'
  },
  {
    name: 'Santos',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33'
  },
  {
    name: 'Bahia',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '33.33'
  },
  {
    name: 'Napoli-SC',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 0,
    goalsOwn: 3,
    goalsBalance: -3,
    efficiency: '0.00'
  }
]


const listAllTeams = [
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 12,
    "goalsBalance": -2,
    "efficiency": "26.67"
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 8,
    "goalsOwn": 7,
    "goalsBalance": 1,
    "efficiency": "26.67"
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": "20.00"
  },
  {
    "name": "Grêmio",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 11,
    "goalsOwn": 6,
    "goalsBalance": 5,
    "efficiency": "20.00"
  },
]

export {
  listTeamsHome,
  listAllTeams,
  listTeamsHomeMock,
  listTeamsAwayMock,
  listTeamsAway,
}