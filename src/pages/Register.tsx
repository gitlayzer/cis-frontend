import React from 'react';
import { Form, Input, Button, message, Space, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { userApi } from '../api/user';
import { User } from '../types/user';
import AuthLayout from '../components/AuthLayout';
import { useTheme } from '../contexts/ThemeContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isDark } = useTheme();

  const handleRegister = async (values: User) => {
    try {
      await userApi.register(values);
      message.success('注册成功');
      navigate('/login');
    } catch (error) {
      message.error('注册失败');
    }
  };

  const inputClassName = isDark 
    ? 'bg-[#141414] border-[#434343] text-[#d9d9d9] hover:border-[#165996] focus:border-[#177ddc]' 
    : '';

  return (
    <AuthLayout
      title="注册"
      subtitle="创建您的账号"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleRegister}
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
            注册
          </Button>
        </Form.Item>
        <div className="text-center">
          <Space>
            <Typography.Text type="secondary" className={isDark ? '!text-gray-400' : ''}>
              已有账号？
            </Typography.Text>
            <Link to="/login" className={isDark ? 'text-[#177ddc] hover:text-[#165996]' : ''}>
              立即登录
            </Link>
          </Space>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Register; 