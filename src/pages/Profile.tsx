import React from 'react';
import { Card, Typography, Button, Descriptions, message } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const { Title } = Typography;

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('退出登录成功');
    navigate('/login');
  };

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-[#141414]' : 'bg-gray-50'}`}>
      <Card 
        className={`max-w-3xl mx-auto shadow-md ${
          isDark ? 'bg-[#1f1f1f] border-[#303030]' : 'bg-white'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2} className={`!mb-1 ${isDark ? '!text-gray-100' : ''}`}>
              个人信息
            </Title>
            <Typography.Text type="secondary" className={isDark ? '!text-gray-400' : ''}>
              查看和管理您的账号信息
            </Typography.Text>
          </div>
          <Button 
            type="primary" 
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </div>

        <div className="flex justify-center mb-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
            isDark ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <UserOutlined style={{ fontSize: '2rem' }} className={isDark ? 'text-gray-300' : ''} />
          </div>
        </div>

        <Descriptions 
          bordered 
          column={1}
          className={isDark ? 'dark-descriptions' : ''}
          labelStyle={isDark ? { backgroundColor: '#1f2937' } : {}}
          contentStyle={isDark ? { backgroundColor: '#374151' } : {}}
        >
          <Descriptions.Item 
            label={<span className={isDark ? 'text-gray-300' : ''}>用户名</span>}
          >
            <span className={isDark ? 'text-gray-300' : ''}>
              {localStorage.getItem('username') || '未知用户'}
            </span>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Profile; 