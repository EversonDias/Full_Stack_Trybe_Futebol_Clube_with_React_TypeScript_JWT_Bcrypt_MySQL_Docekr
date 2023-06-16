export type NewEntity<T> = Omit<T, 'id'>;

export type payload = {
  email: string
  password: string
};
