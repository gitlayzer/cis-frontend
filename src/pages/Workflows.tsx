import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, message, Card, Typography, Tabs, Layout } from 'antd';
import { 
  PlusOutlined, 
  SyncOutlined, 
  DashboardOutlined, 
  UnorderedListOutlined 
} from '@ant-design/icons';
import WorkflowList from '../components/WorkflowList';
import WorkflowForm from '../components/WorkflowForm';
import WorkflowStats from '../components/WorkflowStats';
import { workflowApi } from '../api/workflow';
import { Workflow } from '../types/workflow';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

const { Title } = Typography;

const Workflows: React.FC = () => {
  const { isDark } = useTheme();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const errorShown = useRef(false);

  const fetchWorkflows = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      errorShown.current = false;
      const response = await workflowApi.getWorkflows();
      const workflowData = response.data as unknown as Workflow[];
      setWorkflows(workflowData);
    } catch (error) {
      if (!errorShown.current) {
        message.error('获取工作流列表失败');
        errorShown.current = true;
      }
      console.error('Error fetching workflows:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const handleRefresh = async () => {
    await fetchWorkflows();
  };

  const handleCreateWorkflow = async (values: any) => {
    try {
      await workflowApi.createWorkflow(values);
      message.success('创建工作流成功');
      setIsModalVisible(false);
      fetchWorkflows();
    } catch (error) {
      console.error('Error creating workflow:', error);
      message.error('创建失败');
    }
  };

  const tabItems = [
    {
      key: 'stats',
      label: (
        <span className="flex items-center gap-1">
          <DashboardOutlined />
          <span>统计概览</span>
        </span>
      ),
      children: <WorkflowStats workflows={workflows} />
    },
    {
      key: 'list',
      label: (
        <span className="flex items-center gap-1">
          <UnorderedListOutlined />
          <span>工作流列表</span>
        </span>
      ),
      children: (
        <WorkflowList 
          workflows={workflows} 
          onRefresh={fetchWorkflows} 
          loading={loading} 
        />
      )
    }
  ];

  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout.Content className="bg-gray-50 p-6">
        <Card className={isDark ? 'bg-[#1f1f1f] border-[#303030]' : ''}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <Title level={2} className="!mb-1">工作流管理</Title>
              <Typography.Text type="secondary">
                管理和监控您的镜像同步工作流
              </Typography.Text>
            </div>
            <div className="space-x-4">
              <Button
                icon={<SyncOutlined />}
                onClick={handleRefresh}
                className={isDark ? 'text-gray-300 hover:text-white border-[#434343]' : ''}
              >
                刷新
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                创建工作流
              </Button>
            </div>
          </div>

          <Tabs defaultActiveKey="stats" items={tabItems} />
        </Card>
      </Layout.Content>

      <Modal
        title={
          <div className="text-center">
            <Title level={3} className="!mb-1">创建工作流</Title>
            <Typography.Text type="secondary">
              配置镜像同步的源和目标
            </Typography.Text>
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        centered
        className={isDark ? 'dark-modal' : 'workflow-modal'}
      >
        <WorkflowForm onSubmit={handleCreateWorkflow} />
      </Modal>
    </Layout>
  );
};

export default Workflows; 