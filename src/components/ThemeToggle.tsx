import React from 'react';
import { Button, Tooltip } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDark ? '切换到亮色模式' : '切换到暗色模式'}>
      <Button
        icon={isDark ? <BulbOutlined /> : <BulbFilled />}
        onClick={toggleTheme}
        className="fixed right-6 bottom-6 z-50 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      />
    </Tooltip>
  );
};

export default ThemeToggle; 