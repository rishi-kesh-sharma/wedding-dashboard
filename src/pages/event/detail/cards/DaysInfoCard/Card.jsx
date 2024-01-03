import { getAvatar } from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import CoverImage from '../../../../../assets/cover.jpg';
import BrideImage from '../../../../../assets/bride.jpg';
import GroomImage from '../../../../../assets/groom.jpg';
import moment from 'moment';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Image } from 'antd';

const DayCard = ({ data, handleDelete, handleEdit }) => {
  const [responsive, setResponsive] = useState(false);
  const { title, description, image, location, dateTime } = data;

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        actions={[
          // <EyeOutlined key="view" />,
          <EditOutlined onClick={() => handleEdit(data)} key="edit" />,
          <DeleteOutlined onClick={() => handleDelete(data)} key="delete" />,
        ]}
        hoverable
        title={title}
        bordered
        headerBordered
        split={responsive ? 'horizontal' : 'vertical'}
      >
        <ProCard bordered={false} title="" split="horizontal">
          <Image
            alt="image"
            style={{ maxHeight: '100px', objectFit: 'contain' }}
            src={image ? image?.image?.fileUrl : CoverImage}
          />
          <ProCard bordered={false}>
            <p>{title}</p>
            <p>{location}</p>
            <p>{moment(dateTime).lang('en').format('LLL')}</p>
          </ProCard>
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};

export default DayCard;
