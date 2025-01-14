import request from '../utils/request';
import { User, LoginResponse } from '../types/user';
import { ApiResponse } from '../types/workflow';

export const userApi = {
  register: (data: User) =>
    request.post<ApiResponse<null>>('/users/register', data),

  login: (data: User) =>
    request.post<ApiResponse<LoginResponse>>('/users/login', data),
}; 