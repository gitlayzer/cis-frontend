import React from 'react';
import { Button } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';

const ThemeToggleButton: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (!isAuthPage) {
    return null;
  }

  return (
    <Button
      type="text"
      icon={isDark ? <BulbOutlined /> : <BulbFilled />}
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 ${
        isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
      }`}
    />
  );
};

export default ThemeToggleButton; 