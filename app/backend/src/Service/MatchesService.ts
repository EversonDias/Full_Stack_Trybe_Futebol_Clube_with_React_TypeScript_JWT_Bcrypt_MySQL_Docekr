import MatchesModel from '../model/MatchesModel';

export default class MatchesService {
  constructor(
    private matchModel = new MatchesModel(),
  ) {}

  findAll = async () => {
    const result = await this.matchModel.findAll();
    return { status: 'SUCCESS', data: result };
  };
}
