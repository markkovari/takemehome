export type User = {
  id: number;
  name: string;
  email: string;
};

export type Login = {
  access_token: string;
  user: User;
};

export type Query = {
  login: Login;
};
