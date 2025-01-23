import React, { useState } from 'react';
import { Card, Button, Row, Col, Typography, Tag, Space, Modal, Input, DatePicker } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Paragraph } = Typography;

const TaskBox = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Submit Attendance Report',
      description: 'Submit the monthly attendance report by the end of the day. Make sure all fields are filled correctly. If there are any discrepancies, please investigate and correct them as needed.',
      dueDate: '2025-01-25',
      status: 'pending',
      extensionRequest: null, // to store extension request details
    },
    {
      id: 2,
      title: 'Complete HR Policy Acknowledgement',
      description: 'Review and acknowledge the new HR policy document.',
      dueDate: '2025-01-26',
      status: 'completed',
      extensionRequest: null,
    },
    {
      id: 3,
      title: 'Update Profile Information',
      description: 'Update your personal details on the HR portal.',
      dueDate: '2025-01-27',
      status: 'pending',
      extensionRequest: null,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newDueDate, setNewDueDate] = useState(null);
  const [reason, setReason] = useState('');
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);

  const handleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'completed' } : task
      )
    );
  };

  const handleExtensionRequest = (taskId) => {
    setSelectedTask(taskId);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTask
          ? {
              ...task,
              dueDate: moment(newDueDate).format('YYYY-MM-DD'),
              extensionRequest: { reason, newDueDate },
            }
          : task
      )
    );
    setIsModalVisible(false);
    setNewDueDate(null);
    setReason('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewDueDate(null);
    setReason('');
  };

  const showFullDescription = (taskId) => {
    setSelectedTask(taskId);
    setIsDescriptionModalVisible(true);
  };

  const handleDescriptionCancel = () => {
    setIsDescriptionModalVisible(false);
  };

  return (
    <div style={{ padding: '40px 20px' }}>
      <Row gutter={[16, 16]} justify="center">
        {tasks.map((task) => (
          <Col xs={24} sm={12} md={8} key={task.id}>
            <Card
              bordered={false}
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: task.status === 'completed' ? '#f0f8ff' : '#ffffff',
              }}
            >
              <Title level={4} style={{ marginBottom: '10px' }}>
                {task.title}
              </Title>
              <Paragraph
                style={{
                  color: '#555',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  cursor: 'pointer',
                }}
                onClick={() => showFullDescription(task.id)}
                title={task.description}
              >
                {task.description.length > 100
                  ? task.description.substring(0, 100) + '...'
                  : task.description}
              </Paragraph>
              <Paragraph style={{ fontSize: '14px', color: '#888' }}>
                Due: {task.dueDate}
              </Paragraph>

              <Space direction="vertical" size="middle">
                {task.status === 'completed' ? (
                  <Tag color="success" icon={<CheckCircleOutlined />}>
                    Completed
                  </Tag>
                ) : (
                  <Tag color="warning" icon={<ExclamationCircleOutlined />}>
                    Pending
                  </Tag>
                )}
                <Button
                  type="primary"
                  block
                  disabled={task.status === 'completed'}
                  onClick={() => handleTaskStatus(task.id)}
                >
                  {task.status === 'completed' ? 'Task Completed' : 'Mark as Completed'}
                </Button>
                {task.status === 'pending' && !task.extensionRequest && (
                  <Button
                    type="default"
                    block
                    onClick={() => handleExtensionRequest(task.id)}
                  >
                    Request Extension
                  </Button>
                )}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Extension Request Modal */}
      <Modal
        title="Request Task Extension"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <div style={{ marginBottom: '10px' }}>
          <DatePicker
            value={newDueDate ? moment(newDueDate) : null}
            onChange={(date) => setNewDueDate(date)}
            style={{ width: '100%' }}
            placeholder="Select new due date"
          />
        </div>
        <div>
          <Input.TextArea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            placeholder="Reason for extension"
          />
        </div>
      </Modal>

      {/* Full Description Modal */}
      <Modal
        title="Full Task Description"
        visible={isDescriptionModalVisible}
        onCancel={handleDescriptionCancel}
        footer={null}
      >
        <Paragraph>{tasks.find((task) => task.id === selectedTask)?.description}</Paragraph>
      </Modal>
    </div>
  );
};

export default TaskBox;
