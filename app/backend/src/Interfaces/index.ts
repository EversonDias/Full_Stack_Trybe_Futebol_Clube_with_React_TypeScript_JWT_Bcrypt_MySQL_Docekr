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
