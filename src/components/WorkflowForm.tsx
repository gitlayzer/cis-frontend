import React, { useEffect } from 'react';
import { Form, Input, Button, Space, message, Switch, Card, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Workflow } from '../types/workflow';

const { Text } = Typography;

interface WorkflowFormProps {
  initialValues?: Partial<Workflow>;
  onSubmit: (values: any) => Promise<void>;
  isEdit?: boolean;
}

const WorkflowForm: React.FC<WorkflowFormProps> = ({ initialValues, onSubmit, isEdit = false }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: any) => {
    try {
      await onSubmit(values);
    } catch (error) {
      message.error('操作失败');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
      className="max-w-2xl mx-auto"
    >
      <Form.Item
        label="工作流名称"
        name="name"
        rules={[{ required: true, message: '请输入工作流名称' }]}
      >
        <Input disabled={isEdit} />
      </Form.Item>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="mb-4">源镜像仓库</h3>
        <Form.Item label="仓库地址" name={['source', 'url']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="用户名" name={['source', 'auth', 'username']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="密码" name={['source', 'auth', 'password']} rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="mb-4">目标镜像仓库</h3>
        <Form.List name="targets">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key} className="border-b pb-4 mb-4">
                  <Space align="baseline">
                    <Form.Item
                      {...field}
                      label="仓库地址"
                      name={[field.name, 'url']}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                  <Form.Item
                    {...field}
                    label="用户名"
                    name={[field.name, 'auth', 'username']}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="密码"
                    name={[field.name, 'auth', 'password']}
                    rules={[{ required: true }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="命名空间"
                    name={[field.name, 'namespace']}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="例如: githubops" />
                  </Form.Item>
                </div>
              ))}
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                添加目标仓库
              </Button>
            </>
          )}
        </Form.List>
      </div>

      <Form.List name="images">
        {(fields, { add, remove }) => (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="mb-4">镜像列表</h3>
            {fields.map((field, index) => (
              <div key={field.key} className="flex items-center gap-2 mb-2">
                <Form.Item
                  {...field}
                  className="flex-1 mb-0"
                  rules={[{ required: true, message: '请输入镜像' }]}
                >
                  <Input placeholder="例如: layzer/vyos:1.4.9" />
                </Form.Item>
                <Button 
                  type="text" 
                  danger
                  icon={<MinusCircleOutlined />}
                  onClick={() => remove(field.name)}
                />
              </div>
            ))}
            <Button 
              type="dashed" 
              onClick={() => add()} 
              block 
              icon={<PlusOutlined />}
              className="mt-2"
            >
              添加镜像
            </Button>
          </div>
        )}
      </Form.List>

      <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center mb-4">
          <ClockCircleOutlined className="text-xl mr-2 text-indigo-500" />
          <Text strong>定时配置</Text>
        </div>
        <Form.Item
          label="启用定时执行"
          name={['schedule', 'enabled']}
          valuePropName="checked"
          initialValue={false}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => {
            return prevValues?.schedule?.enabled !== currentValues?.schedule?.enabled;
          }}
        >
          {({ getFieldValue }) => {
            const enabled = getFieldValue(['schedule', 'enabled']);
            return enabled ? (
              <Form.Item
                label="Cron 表达式"
                name={['schedule', 'cron']}
                rules={[
                  { required: true, message: '请输入 Cron 表达式' },
                  {
                    pattern: /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/,
                    message: '请输入有效的 Cron 表达式',
                  },
                ]}
                extra={
                  <div className="text-gray-500 text-sm mt-1">
                    <div>Cron 表达式格式：分 时 日 月 周</div>
                    <div>示例：</div>
                    <ul className="list-disc list-inside">
                      <li>每小时执行一次：0 * * * *</li>
                      <li>每天凌晨2点执行：0 2 * * *</li>
                      <li>每周一凌晨3点执行：0 3 * * 1</li>
                    </ul>
                  </div>
                }
              >
                <Input placeholder="例如：0 * * * *" />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
      </Card>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {isEdit ? '更新' : '提交'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WorkflowForm; 