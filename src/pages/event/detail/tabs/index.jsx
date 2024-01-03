import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import GuestList from '../../guest/list';
import BasicInfoCard from '../cards/BasicInfoCard';
import DaysInfoCard from '../cards/DaysInfoCard';
import ExtraInfoCard from '../cards/ExtraCard';

export default function Tabs({ data, fetchResource, setFetchResource }) {
  const [tab, setTab] = useState('basic-info');
  const [tabPosition, setTabPosition] = useState('top');

  return (
    <div>
      <ProCard
        tabs={{
          tabPosition,
          activeKey: tab,
          items: [
            {
              label: `Basic Info`,
              key: 'basic-info',
              children: <BasicInfoCard data={data} setFetchResource={setFetchResource} />,
            },

            {
              label: `Days Info`,
              key: 'day-info',
              children: <DaysInfoCard data={data} setFetchResource={setFetchResource} />,
            },

            {
              label: `Guest Info`,
              key: 'guest-info',
              children: <GuestList data={data} setFetchResource={setFetchResource} />,
            },
            {
              label: `Agency`,
              key: 'agency',
              children: <ExtraInfoCard data={data} setFetchResource={setFetchResource} />,
            },
          ],
          onChange: (key) => {
            setTab(key);
          },
        }}
      />
    </div>
  );
}
