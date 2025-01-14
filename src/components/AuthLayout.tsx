import React from 'react';
import { Card, Typography, Carousel, Button } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import img1 from '../img/img_1.png';
import img2 from '../img/img_2.png';
import img3 from '../img/img_3.png';

const { Title } = Typography;

// 定义轮播图片数组
const carouselImages = [
  {
    url: img1,
    title: "工作流管理系统",
    description: "高效的容器镜像同步解决方案，轻松管理您的镜像仓库"
  },
  {
    url: img2,
    title: "自动化部署",
    description: "一键配置，自动同步，让镜像管理变得简单"
  },
  {
    url: img3,
    title: "多仓库支持",
    description: "支持多个镜像仓库之间的同步，满足不同场景需求"
  }
];

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex">
      {/* 左侧图片区域 - 修改宽度为 65% */}
      <div className="hidden lg:block lg:w-[65%] relative overflow-hidden">
        <Carousel
          autoplay
          effect="fade"
          dots={false}
          autoplaySpeed={5000}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="h-screen relative">
              {isDark && (
                <div className="absolute inset-0 bg-[#141414] bg-opacity-60 z-10" />
              )}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] hover:scale-110"
                style={{
                  backgroundImage: `url('${image.url}')`,
                  filter: isDark ? 'brightness(0.5)' : 'none',
                }}
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
                <Title level={1} className="!text-white mb-6">
                  {image.title}
                </Title>
                <p className="text-lg text-gray-100 max-w-md text-center">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* 右侧表单区域 - 修改宽度为 35% */}
      <div className={`flex-1 flex flex-col justify-center items-center p-6 ${
        isDark ? 'bg-[#141414]' : 'bg-gray-50'
      }`}>
        <Button
          type="text"
          icon={isDark ? <BulbOutlined /> : <BulbFilled />}
          onClick={toggleTheme}
          className={`fixed top-4 right-4 z-50 ${
            isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        />
        <div className="w-full max-w-md">
          <Card 
            className={`shadow-lg ${isDark ? 'bg-[#1f1f1f] border-[#303030]' : 'bg-white'}`}
            bordered={isDark}
          >
            <div className="text-center mb-8">
              <Title level={2} className={isDark ? '!text-gray-100' : ''}>
                {title}
              </Title>
              <Typography.Text type="secondary" className={isDark ? '!text-gray-400' : ''}>
                {subtitle}
              </Typography.Text>
            </div>
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 