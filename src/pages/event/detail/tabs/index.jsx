import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import GuestList from '../../guest/list';
import BasicInfoCard from '../cards/BasicInfoCard';
import CoupleInfoCard from '../cards/CoupleInfoCard';
import FriendsCardList from '../cards/FriendsCardList';
import DaysInfoCard from '../cards/DaysInfoCard';
import LoveStoryCardList from '../cards/LoveStoryInfoCard';
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
            // {
            //   label: `Couple Info`,
            //   key: 'couple-info',
            //   // children: <CoupleInfoCard data={data} setFetchResource={setFetchResource} />,
            // },
            // {
            //   label: `Friends Info`,
            //   key: 'friends-info',
            //   children: <FriendsCardList data={data} setFetchResource={setFetchResource} />,
            // },
            {
              label: `Days Info`,
              key: 'day-info',
              children: <DaysInfoCard data={data} setFetchResource={setFetchResource} />,
            },
            // {
            //   label: `Love Story`,
            //   key: 'love-story',
            //   // children: <LoveStoryCardList data={data} setFetchResource={setFetchResource} />,
            // },
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
