export interface SignupAdmin {
  username: string;
  email: string;
  password: string;
  avatar?: any;
}

export type SignInAdmin = Omit<SignupAdmin, "username" | "avatar">;
