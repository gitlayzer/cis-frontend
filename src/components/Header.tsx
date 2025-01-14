import React, { useState } from 'react';
import { Layout, Button, Dropdown, Space, Avatar, Modal, Typography, Descriptions } from 'antd';
import { UserOutlined, LogoutOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { useTheme } from '../contexts/ThemeContext';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };
  
  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人信息',
      icon: <UserOutlined />,
      onClick: () => setIsProfileModalVisible(true),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <AntHeader className={`px-6 flex justify-between items-center ${
        isDark 
          ? 'bg-[#141414] text-gray-100 border-b border-[#303030]' 
          : 'bg-white text-gray-800 border-b border-gray-200'
      }`}>
        <div className="text-lg font-semibold">工作流管理系统</div>
        <div className="flex items-center gap-4">
          <Button
            type="text"
            icon={isDark ? <BulbOutlined /> : <BulbFilled />}
            onClick={toggleTheme}
            className={isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
          />
          <Dropdown menu={{ items }} placement="bottomRight">
            <Button type="text" className={isDark ? 'text-gray-100 hover:bg-[#1f1f1f]' : ''}>
              <Space>
                <Avatar icon={<UserOutlined />} className={isDark ? 'bg-[#1f1f1f]' : ''} />
                {localStorage.getItem('username') || '未知用户'}
              </Space>
            </Button>
          </Dropdown>
        </div>
      </AntHeader>

      <Modal
        title={
          <div className="text-center">
            <Title level={3} className={`!mb-1 ${isDark ? '!text-gray-100' : ''}`}>
              个人信息
            </Title>
            <Typography.Text type="secondary" className={isDark ? '!text-gray-400' : ''}>
              查看和管理您的账号信息
            </Typography.Text>
          </div>
        }
        open={isProfileModalVisible}
        onCancel={() => setIsProfileModalVisible(false)}
        footer={[
          <Button 
            key="logout"
            type="primary" 
            danger
            icon={<LogoutOutlined />}
            onClick={() => {
              handleLogout();
              setIsProfileModalVisible(false);
            }}
          >
            退出登录
          </Button>
        ]}
        centered
        width={500}
        className={isDark ? 'dark-modal' : ''}
      >
        <div className="flex justify-center mb-8 mt-4">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
            isDark ? 'bg-[#1f1f1f]' : 'bg-gray-100'
          }`}>
            <UserOutlined style={{ fontSize: '2rem' }} className={isDark ? 'text-gray-300' : ''} />
          </div>
        </div>

        <Descriptions 
          bordered 
          column={1}
          className={isDark ? 'dark-descriptions' : ''}
          labelStyle={isDark ? { 
            backgroundColor: '#1f1f1f',
            borderColor: '#303030'
          } : {}}
          contentStyle={isDark ? { 
            backgroundColor: '#141414',
            borderColor: '#303030'
          } : {}}
        >
          <Descriptions.Item 
            label={<span className={isDark ? 'text-gray-300' : ''}>用户名</span>}
          >
            <span className={isDark ? 'text-gray-300' : ''}>
              {localStorage.getItem('username') || '未知用户'}
            </span>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default Header; 