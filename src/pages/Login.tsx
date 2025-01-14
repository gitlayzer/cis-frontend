import React from 'react';
import { Form, Input, Button, message, Space, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { userApi } from '../api/user';
import { User } from '../types/user';
import AuthLayout from '../components/AuthLayout';
import { useTheme } from '../contexts/ThemeContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isDark } = useTheme();

  const handleLogin = async (values: User) => {
    try {
      const response = await userApi.login(values);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', values.username);
      if (response.data.email) {
        localStorage.setItem('email', response.data.email);
      }
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error('登录失败');
    }
  };

  const inputClassName = isDark 
    ? 'bg-[#141414] border-[#434343] text-[#d9d9d9] hover:border-[#165996] focus:border-[#177ddc]' 
    : '';

  return (
    <AuthLayout
      title="登录"
      subtitle="登录以管理您的工作流"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleLogin}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input 
            prefix={<UserOutlined className={isDark ? 'text-[#424242]' : ''} />} 
            placeholder="用户名" 
            size="large"
            className={inputClassName}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password 
            prefix={<LockOutlined className={isDark ? 'text-[#424242]' : ''} />} 
            placeholder="密码" 
            size="large"
            className={inputClassName}
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            size="large"
            className={isDark ? 'bg-[#177ddc] hover:bg-[#165996]' : ''}
          >
            登录
          </Button>
        </Form.Item>
        <div className="text-center">
          <Space>
            <Typography.Text type="secondary" className={isDark ? '!text-gray-400' : ''}>
              还没有账号？
            </Typography.Text>
            <Link to="/register" className={isDark ? 'text-[#177ddc] hover:text-[#165996]' : ''}>
              立即注册
            </Link>
          </Space>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Login; 