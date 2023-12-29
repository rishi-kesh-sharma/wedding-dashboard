import { getAvatar } from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import CoverImage from '../../../../assets/cover.jpg';

import moment from 'moment';
import { Button, Image, Tag, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import BasicInfoEditModal from '../modals/BasicInfoEditModal';
const { Title, Text, Paragraph } = Typography;

const BasicInfoCard = ({ data, setFetchResource }) => {
  const [responsive, setResponsive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    _id,
    title,
    description,
    startDateTime,
    endDateTime,
    couple,
    backgrounds,
    venue,
    status,
  } = data;

  const handleClick = () => {
    setModalVisible(true);
  };
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard>
        <ProCard
          title={<Title level={5}>{title}</Title>}
          extra={
            <div style={{ display: 'flex', gap: '1rem' }}>
              <EditOutlined
                onClick={handleClick}
                style={{ fontSize: '1.3rem', color: 'blue', cursor: 'pointer' }}
              />
              <Tag color="warning">{status}</Tag>
            </div>
          }
          // headerBordered
          split={''}
        >
          <ProCard>
            <Image
              style={{ maxHeight: '600px', objectFit: 'contain' }}
              alt="image"
              src={backgrounds?.length > 0 ? backgrounds?.[0]?.image?.fileUrl : CoverImage}
            />
          </ProCard>
          <ProCard>
            <div>
              <div>
                <Title level={5}>Start Date and Time</Title>
                <p>{moment(startDateTime).lang('en').format('LLL')}</p>
              </div>
              <div>
                <Title level={5}>End Date and Time</Title>
                <p>{moment(endDateTime).lang('en').format('LLL')}</p>
              </div>
              <div>
                <Title level={5}>Venue</Title>
                <Text>{venue}</Text>
              </div>
            </div>
          </ProCard>
        </ProCard>
        <ProCard>
          <Title level={5}>Event Description</Title>
          <Paragraph>{`${description} 
              `}</Paragraph>
        </ProCard>
        <BasicInfoEditModal
          setFetchResource={setFetchResource}
          visible={modalVisible}
          setVisible={setModalVisible}
          current={{
            _id,
            title,
            description,
            startDateTime,
            endDateTime,
            couple,
            backgrounds,
            venue,
            status,
          }}
        />
      </ProCard>
    </RcResizeObserver>
  );
};

export default BasicInfoCard;
