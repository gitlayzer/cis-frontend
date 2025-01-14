import React from 'react';
import { Table, Button, Space, Tag, Popconfirm, message } from 'antd';
import { Workflow, WorkflowStatus } from '../types/workflow';
import { workflowApi } from '../api/workflow';
import { useNavigate } from 'react-router-dom';

interface WorkflowListProps {
  workflows: Workflow[];
  onRefresh: () => void;
  loading?: boolean;
}

const WorkflowList: React.FC<WorkflowListProps> = ({ workflows, onRefresh, loading }) => {
  const navigate = useNavigate();

  const handleExecute = async (name: string) => {
    try {
      await workflowApi.executeWorkflow(name);
      message.success('工作流开始执行');
      onRefresh();
    } catch (error) {
      console.error('Error executing workflow:', error);
      message.error('执行失败');
    }
  };

  const handleCancel = async (name: string) => {
    try {
      await workflowApi.cancelWorkflow(name);
      message.success('工作流已取消');
      onRefresh();
    } catch (error) {
      console.error('Error canceling workflow:', error);
      message.error('取消失败');
    }
  };

  const handleDelete = async (name: string) => {
    try {
      await workflowApi.deleteWorkflow(name);
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      console.error('Error deleting workflow:', error);
      message.error('删除失败');
    }
  };

  const columns = [
    {
      title: '工作流名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: WorkflowStatus) => {
        const colors: Record<WorkflowStatus, string> = {
          pending: 'gold',
          running: 'blue',
          completed: 'green',
          failed: 'red',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: '镜像数量',
      dataIndex: 'images',
      key: 'images',
      render: (images: string[]) => images?.length || 0,
    },
    {
      title: '最后更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (time: string) => time ? new Date(time).toLocaleString() : '-',
    },
    {
      title: '源仓库',
      dataIndex: ['source', 'url'],
      key: 'source',
    },
    {
      title: '目标仓库数',
      dataIndex: 'targets',
      key: 'targets',
      render: (targets: any[]) => targets?.length || 0,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: Workflow) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleExecute(record.name)}
            disabled={record.status === 'running'}
          >
            执行
          </Button>
          {record.status === 'running' && (
            <Button danger onClick={() => handleCancel(record.name)}>
              取消
            </Button>
          )}
          <Button type="link" onClick={() => navigate(`/workflow/${record.name}`)}>
            查看详情
          </Button>
          <Popconfirm
            title="确定要删除这个工作流吗？"
            onConfirm={() => handleDelete(record.name)}
          >
            <Button danger type="link">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={workflows} 
      rowKey="name"
      loading={loading}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`,
      }}
    />
  );
};

export default WorkflowList; 