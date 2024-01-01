import { useState } from 'react';
import { Link } from 'umi';
import { ProCard } from '@ant-design/pro-components';
import GuestInfoForm from '../forms/GuestInfoForm';
import DayInfoForm from '../forms/DayInfoForm';
import BasicInfoForm from '../forms/BasicInfoForm';
import { Button } from 'antd';
import GuestList from '../../guest/list';
import Detail from '../../detail';
import CoupleInfoForm from '../forms/CoupleInfoForm';
import FriendsInfoForm from '../forms/FriendsInfoForm';
import LoveStoryInfoForm from '../forms/LoveStoryInfoForm';

export default function Tabs({ currentId, setCurrentId }) {
  const [tab, setTab] = useState('basic-info');
  const [tabPosition, setTabPosition] = useState('top');

  return (
    <div>
      <ProCard
        title={
          <Link key={'event-list'} to={'/event/list'}>
            <Button type="primary">Back to Events</Button>
          </Link>
        }
        tabs={{
          tabPosition,
          activeKey: tab,
          items: [
            {
              disabled: false,
              label: `Basic Info`,
              key: 'basic-info',
              children: (
                <BasicInfoForm setTab={setTab} currentId={currentId} setCurrentId={setCurrentId} />
              ),
            },

            {
              // disabled: !currentId,
              label: `Days Info`,
              key: 'day-info',
              children: <DayInfoForm setTab={setTab} currentId={currentId} />,
            },

            {
              // disabled: !currentId,
              label: `Guest Info`,
              key: 'guest-info',
              children: <GuestInfoForm setTab={setTab} currentId={currentId} />,
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
