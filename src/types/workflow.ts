export interface Auth {
  username: string;
  password: string;
}

export interface Registry {
  url: string;
  auth: Auth;
  insecure: boolean;
  namespace?: string;
}

export interface Log {
  timestamp: string;
  level: string;
  message: string;
}

export interface Schedule {
  cron: string;
  enabled: boolean;
}

export interface Workflow {
  name: string;
  source: Registry;
  targets: Registry[];
  images: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  createTime: string;
  updateTime: string;
  lastRun: string | null;
  logs: Log[];
  schedule?: Schedule;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
} 