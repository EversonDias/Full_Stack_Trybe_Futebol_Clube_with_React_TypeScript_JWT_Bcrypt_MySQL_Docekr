import { Body } from '../Interfaces/matches/IMatcher';
import MatchesModel from '../model/MatchesModel';
import StatusHTTP from '../utils/StatusHTTP';

export default class MatchesService {
  constructor(
    private matchModel = new MatchesModel(),
  ) {}

  findAll = async () => {
    const result = await this.matchModel.findAll();
    return { status: StatusHTTP.success, data: result };
  };

  getFilterTeam = async ({ query, value }: { query: string, value: boolean }) => {
    const result = await this.matchModel.getFilterTeam({ query, value });
    return { status: StatusHTTP.success, data: result };
  };

  update = async (
    { id, key, value }: { id: number, key: string, value: number | boolean },
  ) => {
    try {
      await this.matchModel.update({ id, key, value });
      return {
        status: StatusHTTP.success,
        data: { message: 'Finished' },
      };
    } catch (error) {
      return {
        status: StatusHTTP.badRequest,
        data: { message: 'Erro' },
      };
    }
  };

  create = async (body: Body) => {
    const result = await this.matchModel.create(body);
    return { status: StatusHTTP.created, data: result };
  };
}
