import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import { get, patch, post, put } from '@/services/http-service';

export async function search(params) {
  return await get('/agency', params);
}
export async function assignAgency({ eventId, agencyId }) {
  return await patch(`/event/add-agency/${eventId}`, {
    agencyId: agencyId,
  });
}

// Filter `option.label` match the user type `input`

const ExtraInfoCard = ({ data }) => {
  const eventId = data?._id;
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const handleAssignAgency = async () => {
    try {
      const response = await assignAgency({ agencyId: selectedAgency, eventId });
    } catch (err) {
      console.log(err);
    }
  };
  const onChange = (value) => {
    console.log(value, 'on change');
    setSelectedAgency(value);
  };
  const AgencySelect = ({ agencies }) => {
    const options = agencies?.map((item) => {
      return {
        label: item?.name,
        value: item?._id,
      };
    });
    return (
      <Select
        showSearch
        placeholder="Select a Agency"
        optionFilterProp="children"
        onChange={onChange}
        options={options}
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
    <div>
      <AgencySelect agencies={agencies} />
      <Button onClick={handleAssignAgency} type="primary">
        Assign Agency
      </Button>
    </div>
  );
};

export default ExtraInfoCard;
