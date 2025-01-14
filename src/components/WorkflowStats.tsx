import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  SyncOutlined, 
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Workflow, WorkflowStatus } from '../types/workflow';

interface WorkflowStatsProps {
  workflows: Workflow[];
}

const WorkflowStats: React.FC<WorkflowStatsProps> = ({ workflows }) => {
  const navigate = useNavigate();

  const stats = {
    total: workflows.length,
    completed: workflows.filter(w => w.status === 'completed').length,
    failed: workflows.filter(w => w.status === 'failed').length,
    running: workflows.filter(w => w.status === 'running').length,
    pending: workflows.filter(w => w.status === 'pending').length,
  };

  // 获取最新的5个工作流
  const recentWorkflows = [...workflows]
    .sort((a, b) => new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime())
    .slice(0, 5);

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
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: Workflow) => (
        <Button 
          type="link" 
          onClick={() => navigate(`/workflow/${record.name}`)}
        >
          查看详情
        </Button>
      ),
    }
  ];

  return (
    <div className="space-y-6">
      <Row gutter={16}>
        <Col span={5}>
          <Card bordered={false} className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="总工作流数"
              value={stats.total}
              prefix={<ClockCircleOutlined className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered={false} className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="成功数量"
              value={stats.completed}
              valueStyle={{ color: '#3f8600' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered={false} className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="失败数量"
              value={stats.failed}
              valueStyle={{ color: '#cf1322' }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered={false} className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="运行中"
              value={stats.running}
              valueStyle={{ color: '#1677ff' }}
              prefix={<SyncOutlined spin />}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false} className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="等待中"
              value={stats.pending}
              valueStyle={{ color: '#faad14' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title="最近工作流" 
        bordered={false}
        className="hover:shadow-md transition-shadow"
        extra={<a href="#">查看全部</a>}
      >
        <Table
          columns={columns}
          dataSource={recentWorkflows}
          rowKey="name"
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  );
};

export default WorkflowStats; 