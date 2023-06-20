const listMatchesResolver = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Grêmio"
    },
    "awayTeam": {
      "teamName": "São Paulo"
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
      "teamName": "Santos"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 3,
    "homeTeamId": 4,
    "homeTeamGoals": 3,
    "awayTeamId": 11,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Napoli-SC"
    },
    "awayTeam": {
      "teamName": "Corinthians"
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
      "teamName": "Bahia"
    },
    "awayTeam": {
      "teamName": "Botafogo"
    }
  },
]

const createModel = (list: typeof listMatchesResolver) => {
  return list.map((match) => ({dataValues: match}))
}

const listMatchesTrue = [listMatchesResolver[0], listMatchesResolver[2]]
const listMatchesMockModel = createModel(listMatchesResolver)
const listMatchesTrueModel = createModel(listMatchesTrue);

export {
  listMatchesResolver,
  listMatchesMockModel,
  listMatchesTrue,
  listMatchesTrueModel,
}