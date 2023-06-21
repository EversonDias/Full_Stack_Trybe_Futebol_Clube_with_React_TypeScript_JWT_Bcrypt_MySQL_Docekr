import * as bcrypt from 'bcryptjs';

const compare = async (
  { password, hash }: { password: string, hash: string },
) => {
  const response = await bcrypt.compare(password, hash);
  return response;
};

const hash = (password: string) => {
  const token = bcrypt.hash(password, 10);
  return token;
};

export default {
  hash,
  compare,
};
