import { Col, Image, Row } from 'antd';
import { useEffect } from 'react';

const MyProfile = ({ data }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <Image src={`${API_URL}/${data?.image}`} /> */}
      <br />
      <br />
      <div style={{ width: '500px', display: 'grid', justifyItems: 'start' }}>
        <Row style={{ width: '300px' }}>
          <Col span={8}>
            <strong>Name:</strong>
          </Col>
          <Col>{data?.name}</Col>
        </Row>
        <Row style={{ width: '300px' }}>
          <Col span={8}>
            <strong>Email:</strong>
          </Col>
          <Col>{data?.email}</Col>
        </Row>
        <Row style={{ width: '300px' }}>
          <Col span={8}>
            <strong>Phone :</strong>
          </Col>
          <Col>{data?.phone}</Col>
        </Row>
        <Row style={{ width: '300px' }}>
          <Col span={8}>
            <strong>Role :</strong>
          </Col>
          <Col>{data?.role}</Col>
        </Row>
  
      </div>
    </div>
  );
};

export default MyProfile;
