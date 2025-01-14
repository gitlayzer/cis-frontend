import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Workflows from './pages/Workflows';
import WorkflowDetailPage from './pages/WorkflowDetailPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { ThemeProvider } from './contexts/ThemeContext';

// 检查是否已登录
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// 受保护的路由
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Workflows />
      </ProtectedRoute>
    )
  },
  {
    path: "/workflow/:name",
    element: (
      <ProtectedRoute>
        <WorkflowDetailPage />
      </ProtectedRoute>
    )
  }
]);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App; 