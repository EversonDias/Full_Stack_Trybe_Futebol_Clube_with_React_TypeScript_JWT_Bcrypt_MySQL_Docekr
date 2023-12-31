import IUser from '../Interfaces/IUsers';
import SequelizeUser from '../database/models/SequelizeUser';

export default class LoginModel {
  private model = SequelizeUser;

  findOne = async (email: string): Promise<IUser | null> => {
    const data = await this.model.findOne({ where: { email } });
    if (data === null) return null;
    return data.dataValues;
  };
}
