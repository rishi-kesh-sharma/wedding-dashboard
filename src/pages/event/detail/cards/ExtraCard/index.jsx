import React, { useEffect, useState } from 'react';
import { Button, Select, Space, Typography, message } from 'antd';
import { get, patch, post, put } from '@/services/http-service';

export async function search(params) {
  return await get('/agency', params);
}
export async function assignAgency({ eventId, agencyId }) {
  return await patch(`/event/add-agency/${eventId}`, {
    agencyId: agencyId,
  });
}

import { List } from 'antd';
import { sendEmail } from '@/pages/event/guest/service';

const AgencyInfo = ({ agency }) => {
  const data = [
    {
      title: 'Name',
      description: agency.name,
    },
    {
      title: 'Email',
      description: agency.email,
    },
    {
      title: 'Phone',
      description: agency.phone,
    },
    {
      title: 'Address',
      description: agency.address,
    },
  ];
  return (
    <List
      size="large"
      itemLayout="horizontal"
      dataSource={data}
      grid={{ column: 2, gutter: '6rem' }}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta title={<p>{item.title}</p>} description={<p>{item.description}</p>} />
        </List.Item>
      )}
    />
  );
};

const ExtraInfoCard = ({ data, setFetchResource }) => {
  const eventId = data?._id;
  const [agencies, setAgencies] = useState([{}]);
  const [selectedAgency, setSelectedAgency] = useState(null);

  if (data.agency) {
    // return (
    // );
  }
  const handleAssignAgency = async () => {
    try {
      const response = await assignAgency({ agencyId: selectedAgency.value, eventId });
      message.success('Agent assigned successfully to this event');
      setFetchResource(true);
    } catch (err) {
      message.err(err.response.message || 'Could not assign  agent');
      console.log(err);
    }
  };
  const onChange = (value) => {
    setSelectedAgency(value);
  };
  // const filterOption = (input, option) =>
  //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const AgencySelect = ({ agencies }) => {
    const options = agencies?.map((item) => {
      return {
        label: item?.name,
        value: item?._id,
      };
    });
    return (
      <Select
        size="lg"
        labelInValue
        style={{ width: 200 }}
        defaultValue={options[1]}
        value={selectedAgency}
        showSearch
        placeholder="Select a Agency"
        optionFilterProp="children"
        onChange={onChange}
        options={options}
        // filterOption={filterOption}
      />
    );
  };
  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const response = await search();
        setAgencies(response?.data);
      } catch (err) {}
    };
    console.log('hello from agency');
    fetchAgency();
  }, []);
  return (
    <Space size={'large'} direction="vertical">
      <div>
        <AgencySelect agencies={agencies} />
        <Button onClick={handleAssignAgency} type="primary">
          {data?.agency ? 'Change' : 'Assign'} Agency
        </Button>
        <Button style={{ marginLeft: '1rem' }} onClick={sendEmail} type="primary">
          Send Email
        </Button>
      </div>
      {data?.agency && (
        <div>
          <Typography.Title level={5}>Assigned Agency Details</Typography.Title>
          <AgencyInfo agency={data.agency} />
        </div>
      )}
    </Space>
  );
};

export default ExtraInfoCard;
