import React, { useState } from 'react';
import { Card, Descriptions, Tag, Timeline, Button, Space, Divider, message, Modal } from 'antd';
import { 
  ClockCircleOutlined,
  CloudServerOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { Workflow, WorkflowStatus } from '../types/workflow';
import { workflowApi } from '../api/workflow';
import WorkflowForm from './WorkflowForm';
import { maskUsername } from '../utils/format';

interface WorkflowDetailProps {
  workflow: Workflow;
  onRefresh: () => void;
}

const WorkflowDetail: React.FC<WorkflowDetailProps> = ({ workflow, onRefresh }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleExecute = async () => {
    try {
      await workflowApi.executeWorkflow(workflow.name);
      message.success('工作流开始执行');
      onRefresh();
    } catch (error) {
      message.error('执行失败');
    }
  };

  const handleCancel = async () => {
    try {
      await workflowApi.cancelWorkflow(workflow.name);
      message.success('工作流已取消');
      onRefresh();
    } catch (error: unknown) {
      message.error('取消失败');
    }
  };

  const handleUpdate = async (values: Partial<Workflow>) => {
    try {
      await workflowApi.updateWorkflow(workflow.name, values);
      message.success('工作流更新成功');
      setIsEditModalVisible(false);
      onRefresh();
    } catch (error: unknown) {
      console.error('Error updating workflow:', error);
      throw error;
    }
  };

  const getStatusTag = (status: WorkflowStatus) => {
    const colors: Record<WorkflowStatus, string> = {
      pending: 'gold',
      running: 'blue',
      completed: 'green',
      failed: 'red',
    };
    return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
  };

  return (
    <div className="space-y-6">
      <Card 
        title={
          <Space>
            <CloudServerOutlined className="text-blue-500" />
            基本信息
          </Space>
        }
        extra={
          <Space>
            <Button onClick={() => setIsEditModalVisible(true)}>
              编辑
            </Button>
            {workflow.status === 'running' ? (
              <Button danger onClick={handleCancel}>取消执行</Button>
            ) : (
              <Button 
                type="primary" 
                onClick={handleExecute}
                disabled={workflow.status === ('running' as string)}
              >
                执行工作流
              </Button>
            )}
          </Space>
        }
      >
        <Descriptions column={2}>
          <Descriptions.Item label="工作流名称">{workflow.name}</Descriptions.Item>
          <Descriptions.Item label="状态">{getStatusTag(workflow.status)}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{new Date(workflow.createTime).toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{new Date(workflow.updateTime).toLocaleString()}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card 
        title={
          <Space>
            <CloudUploadOutlined className="text-green-500" />
            源镜像仓库
          </Space>
        }
      >
        <Descriptions column={2}>
          <Descriptions.Item label="仓库地址">{workflow.source.url}</Descriptions.Item>
          {workflow.source.auth && (
            <Descriptions.Item label="用户名">
              {maskUsername(workflow.source.auth.username)}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      <Card 
        title={
          <Space>
            <CloudDownloadOutlined className="text-purple-500" />
            目标镜像仓库
          </Space>
        }
      >
        {workflow.targets.map((target, index) => (
          <div key={index}>
            {index > 0 && <Divider />}
            <Descriptions column={2} title={`目标仓库 #${index + 1}`}>
              <Descriptions.Item label="仓库地址">{target.url}</Descriptions.Item>
              {target.auth && (
                <Descriptions.Item label="用户名">
                  {maskUsername(target.auth.username)}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="命名空间">{target.namespace}</Descriptions.Item>
            </Descriptions>
          </div>
        ))}
      </Card>

      <Card 
        title={
          <Space>
            <CloudServerOutlined className="text-orange-500" />
            镜像列表
          </Space>
        }
      >
        {workflow.images.map((image, index) => (
          <Tag key={index} className="mb-2">{image}</Tag>
        ))}
      </Card>

      <Card 
        title={
          <Space>
            <ClockCircleOutlined className="text-indigo-500" />
            定时配置
          </Space>
        }
      >
        <Descriptions column={2}>
          <Descriptions.Item label="定时执行">
            {workflow.schedule?.enabled ? (
              <Tag color="success">已启用</Tag>
            ) : (
              <Tag color="default">未启用</Tag>
            )}
          </Descriptions.Item>
          {workflow.schedule?.enabled && (
            <Descriptions.Item label="Cron 表达式">
              {workflow.schedule.cron}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      <Card 
        title={
          <Space>
            <HistoryOutlined className="text-blue-500" />
            执行日志
          </Space>
        }
      >
        <Timeline
          items={workflow.logs.map(log => ({
            color: log.level === 'info' ? 'blue' : 'red',
            children: (
              <div>
                <div className="text-gray-500 text-sm">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
                <div>{log.message}</div>
              </div>
            )
          }))}
        />
      </Card>

      <Modal
        title="编辑工作流"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={800}
      >
        <WorkflowForm 
          initialValues={workflow}
          onSubmit={handleUpdate}
          isEdit={true}
        />
      </Modal>
    </div>
  );
};

export default WorkflowDetail; 