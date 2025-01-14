import { ApiResponse } from './workflow';

export interface User {
  username: string;
  password: string;
  email?: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  email?: string;
}

export interface ApiLoginResponse extends ApiResponse<LoginResponse> {
  data: LoginResponse;
} 