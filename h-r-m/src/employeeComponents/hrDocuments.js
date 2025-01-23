import React from 'react';
import { Card, Typography, Tag, Button, Row, Col } from 'antd';
import { 
  FileProtectOutlined, 
  DownloadOutlined, 
  FilePdfOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

const HRDocuments = () => {
  const documents = [
    {
      id: 1,
      title: 'Attendance Policy',
      icon: <FilePdfOutlined style={{ color: '#FF4D4F', fontSize: '24px' }} />,
      description: 'Comprehensive attendance guidelines',
      size: '2.5 MB',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'Leave Policy',
      icon: <FilePdfOutlined style={{ color: '#FF4D4F', fontSize: '24px' }} />,
      description: 'Detailed leave and vacation procedures',
      size: '3.2 MB',
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      title: 'Employee Conduct',
      icon: <FilePdfOutlined style={{ color: '#FF4D4F', fontSize: '24px' }} />,
      description: 'Professional behavior expectations',
      size: '1.8 MB',
      lastUpdated: '2024-01-20'
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <FileProtectOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#1890FF' }} />
        <Title level={2} style={{ margin: 0 }}>HR Documents</Title>
      </div>

      <Row gutter={[16, 16]}>
        {documents.map((doc) => (
          <Col xs={24} sm={12} md={8} key={doc.id}>
            <Card 
              hoverable
              style={{ 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s'
              }}
              bodyStyle={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '20px' 
              }}
            >
              <div style={{ width: '100%' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <div>
                    <Title level={4} style={{ margin: 0 }}>
                      {doc.title}
                    </Title>
                    <Text type="secondary" style={{ display: 'block', marginTop: '8px' }}>
                      {doc.description}
                    </Text>
                    <div style={{ marginTop: '12px' }}>
                      <Tag color="blue">{doc.size}</Tag>
                      <Tag color="green">Updated: {doc.lastUpdated}</Tag>
                    </div>
                  </div>
                  <Button 
                    type="primary" 
                    icon={<DownloadOutlined />}
                    shape="circle"
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    }}
                  />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HRDocuments;