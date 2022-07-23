export interface Token {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  user_type: string;
}
