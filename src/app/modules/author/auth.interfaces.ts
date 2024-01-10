export type IUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  phone_no: string;
};

export type ILogin = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
};
