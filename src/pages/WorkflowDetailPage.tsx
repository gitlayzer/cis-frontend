import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, message, Typography, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import WorkflowDetail from '../components/WorkflowDetail';
import { workflowApi } from '../api/workflow';
import { Workflow } from '../types/workflow';

const { Title } = Typography;

const WorkflowDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWorkflow = async () => {
    if (!name) return;
    try {
      setLoading(true);
      const response = await workflowApi.getWorkflow(name);
      setWorkflow(response.data);
    } catch (error) {
      message.error('获取工作流详情失败');
      console.error('Error fetching workflow:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflow();
  }, [name]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="shadow-md">
        <div className="flex items-center mb-6">
          <Button
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            返回
          </Button>
          <div>
            <Title level={2} className="!mb-1">工作流详情</Title>
            <Typography.Text type="secondary">
              查看工作流配置和执行状态
            </Typography.Text>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Spin size="large" />
          </div>
        ) : workflow ? (
          <WorkflowDetail 
            workflow={workflow}
            onRefresh={fetchWorkflow}
          />
        ) : null}
      </Card>
    </div>
  );
};

export default WorkflowDetailPage; 