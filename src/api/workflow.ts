import request from '../utils/request';
import { Workflow, ApiResponse } from '../types/workflow';

export const workflowApi = {
  getWorkflows: () => 
    request.get<ApiResponse<Workflow[]>>('/workflows'),

  getWorkflow: (name: string) =>
    request.get<ApiResponse<Workflow>>(`/workflows/${name}`),

  createWorkflow: (workflow: Omit<Workflow, 'status' | 'createTime' | 'updateTime' | 'lastRun' | 'logs'>) =>
    request.post<ApiResponse<Workflow>>('/workflows', workflow),

  updateWorkflow: (name: string, data: Partial<Workflow>) => {
    return request.put(`/workflows/${name}`, data);
  },

  deleteWorkflow: (name: string) =>
    request.delete<ApiResponse<null>>(`/workflows/${name}`),

  executeWorkflow: (name: string) =>
    request.post<ApiResponse<null>>(`/workflows/${name}/execute`),

  cancelWorkflow: (name: string) =>
    request.post<ApiResponse<null>>(`/workflows/${name}/cancel`)
}; 