import { Image } from 'antd';
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
      <div style={{ width: 'fit-content', display: 'grid', justifyItems: 'center' }}>
        <span>
          <strong>Name:</strong> {data?.name}
        </span>

        <span>
          <strong>Email:</strong> {data?.email}
        </span>
        <span>
          <strong>Phone Number:</strong> {data?.phone}
        </span>
        <span>
          <strong>Role:</strong> {data?.role}
        </span>
      </div>
    </div>
  );
};

export default MyProfile;
