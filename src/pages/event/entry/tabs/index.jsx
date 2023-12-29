import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import GuestList from '../../guest/list';
import Detail from '../../detail';
import BasicInfoForm from '../forms/BasicInfoForm';
import CoupleInfoForm from '../forms/CoupleInfoForm';
import FriendsInfoForm from '../forms/FriendsInfoForm';
import GuestInfoForm from '../forms/GuestInfoForm';
import DayInfoForm from '../forms/DayInfoForm';
import LoveStoryInfoForm from '../forms/LoveStoryInfoForm';

export default function Tabs({ currentId, setCurrentId }) {
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
              disabled: false,
              label: `Basic Info`,
              key: 'basic-info',
              children: <BasicInfoForm currentId={currentId} setCurrentId={setCurrentId} />,
            },
            {
              disabled: !currentId,
              label: `Couple Info`,
              key: 'couple-info',
              children: <CoupleInfoForm currentId={currentId} />,
            },
            {
              disabled: !currentId,

              label: `Friends Info`,
              key: 'friends-info',
              children: <FriendsInfoForm currentId={currentId} />,
            },
            {
              disabled: !currentId,
              label: `Days Info`,
              key: 'day-info',
              children: <DayInfoForm currentId={currentId} />,
            },
            {
              disabled: !currentId,
              label: `Love Story`,
              key: 'love-story',
              children: <LoveStoryInfoForm currentId={currentId} />,
            },
            {
              disabled: !currentId,
              label: `Guest Info`,
              key: 'guest-info',
              children: <GuestInfoForm currentId={currentId} />,
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
