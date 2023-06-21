import { InferAttributes } from 'sequelize';
import { Body } from '../Interfaces/matches/IMatcher';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchesModel {
  private model = SequelizeMatch;

  findAll = async (): Promise<InferAttributes<SequelizeMatch, {
    omit: never;
  }>[]> => {
    const result = await this
      .model.findAll({
        include: [
          { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      });
    const data = result.map(({ dataValues }) => dataValues);
    return data;
  };

  getFilterTeam = async ({ query, value }: { query: string, value: boolean }) => {
    const result = await this.model.findAll({
      where: { [query]: value },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    const data = result.map(({ dataValues }) => dataValues);
    return data;
  };

  update = async (
    { id, key, value }: { id: number, key: string, value: number | boolean },
  ): Promise<void> => {
    try {
      await this.model.update({ [key]: value }, { where: { id } });
    } catch (error) {
      console.log(error);
    }
  };

  create = async (body: Body) => {
    const result = await this.model.create({ ...body, inProgress: false });
    return result.dataValues;
  };
}
