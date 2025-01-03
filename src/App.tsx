import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Workflows from './pages/Workflows';
import WorkflowDetailPage from './pages/WorkflowDetailPage';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Workflows />
    },
    {
      path: "/workflow/:name",
      element: <WorkflowDetailPage />
    }
  ]
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <ThemeToggle />
    </ThemeProvider>
  );
};

export default App; 