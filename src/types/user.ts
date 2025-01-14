export interface User {
  username: string;
  password: string;
  email?: string;
}

export interface LoginResponse {
  token: string;
} 