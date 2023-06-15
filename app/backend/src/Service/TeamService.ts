import SequelizeTeam from '../database/models/TeamModel';

const getAll = async () => {
  const response = (await SequelizeTeam.findAll()).map(({ dataValues }) => dataValues);
  return {
    status: 'SUCCESS',
    data: response,
  };
};

const getId = async (id: { id: string }) => {
  const response = (await SequelizeTeam.findOne({ where: id }))?.dataValues;
  return {
    status: 'SUCCESS',
    data: response,
  };
};

export default {
  getAll,
  getId,
};
