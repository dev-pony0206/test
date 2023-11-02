export interface SignupAdmin {
  username: string;
  email: string;
  password: string;
  photo?: any;
}

export type SignInAdmin = Omit<SignupAdmin, "username" | "avatar">;

export interface User {
    name: string;
    email: string;
    score:number;
    age:Number
}

export type ClickRowArgument = User & {
    isSelected?: boolean,
    indexInCurrentPage?: number,
  }
