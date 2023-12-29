import { getAvatar } from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import CoverImage from '../../../../assets/cover.jpg';
import BrideImage from '../../../../assets/bride.jpg';
import GroomImage from '../../../../assets/groom.jpg';
import { Button, Card, Image, Space, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CoupleInfoEditModal from '../modals/CoupleInfoEditModal';
import NoDataImage from '../../../../assets/nodata.png';
const { Title } = Typography;

const CoupleInfoCard = ({ data, setFetchResource }) => {
  const [responsive, setResponsive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { title, place } = data;
  const handleClick = () => {
    setModalVisible(true);
  };

  if (!data?.couple) {
    return (
      <>
      <Space direction='vertical' size={"large"}>
      <Button type="primary" onClick={handleClick}>
          {' '}
          Add Couple{' '}
        </Button>
        <img src={NoDataImage} style={{maxHeight:"50vh"}} />
      </Space>
        <CoupleInfoEditModal
          setFetchResource={setFetchResource}
          visible={modalVisible}
          setVisible={setModalVisible}
        />
      </>
    );
  }
  const {
    _id,
    brideName,
    groomName,
    brideAddress,
    groomAddress,
    brideAge,
    groomAge,
    brideImages,
    groomImages,
  } = data?.couple;

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title={<Title level={5}>{title}</Title>}
        extra={
          <div style={{ display: 'flex', gap: '1rem' }}>
            <EditOutlined
              onClick={handleClick}
              style={{ fontSize: '1.3rem', color: 'blue', cursor: 'pointer' }}
            />
          </div>
        }
        bordered
        headerBordered
        split={responsive ? 'horizontal' : 'vertical'}
      >
        <ProCard bordered={false} split="horizontal">
          <Image
            alt="image"
            style={{ maxHeight: '220px', objectFit: 'contain' }}
            src={brideImages?.length > 0 ? brideImages?.[0]?.image?.fileUrl : BrideImage}
          />
          <div style={{ padding: '1rem 0 0 1rem' }}>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <p style={{ fontWeight: '600' }}>{'Name:'}</p>
              <p style={{ fontWeight: '600' }}>{brideName}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <p style={{ fontWeight: '600' }}>{'Address:'}</p>
              <p style={{ fontWeight: '600' }}>{brideAddress}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <p style={{ fontWeight: '600' }}>{'Age:'}</p>
              <p style={{ fontWeight: '600' }}>{brideAge}</p>
            </div>
          </div>
          <ProCard />
        </ProCard>
        <ProCard bordered={false} split="horizontal">
          {/* <div style={{ height: '250px' }}> */}
          <Image
            alt="image"
            style={{ height: '220px', objectFit: 'contain' }}
            src={groomImages?.length > 0 ? groomImages?.[0]?.image?.fileUrl : groomImage}
          />
          {/* </div> */}
          <div style={{ padding: '1rem 0 0 1rem' }}>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <p style={{ fontWeight: '600' }}>{'Name:'}</p>
              <p style={{ fontWeight: '600' }}>{groomName}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <p style={{ fontWeight: '600' }}>{'Address:'}</p>
              <p style={{ fontWeight: '600' }}>{groomAddress}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <p style={{ fontWeight: '600' }}>{'Age:'}</p>
              <p style={{ fontWeight: '600' }}>{groomAge}</p>
            </div>
          </div>
          <ProCard />
        </ProCard>
      </ProCard>
      <CoupleInfoEditModal
        setFetchResource={setFetchResource}
        visible={modalVisible}
        setVisible={setModalVisible}
        current={{
          _id,
          brideName,
          groomName,
          brideAddress,
          groomAddress,
          brideAge,
          groomAge,
          brideImages,
          groomImages,
        }}
      />
    </RcResizeObserver>
  );
};

export default CoupleInfoCard;
