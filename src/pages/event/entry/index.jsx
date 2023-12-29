import React, { useState } from 'react';
import { Form, Card, message, Button, Space } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { save } from '../service';
import getFormProps from '@/data/getFormProps';
import { proFormEventFieldValidation, regexData } from '@/data/util';
import Tabs from './tabs';
import { Link } from 'umi';

const EntryForm = (props) => {
  const [currentId, setCurrentId] = useState('658b23b3e77898bfb4216221');
  return (
    <PageContainer pageHeaderRender={false}>
      <Space direction="vertical" size={'large'}>
        <Link to={'/event/list'}>
          <Button type="primary">Back to Events</Button>
        </Link>
        <Tabs currentId={currentId} setCurrentId={setCurrentId} />
      </Space>
    </PageContainer>
  );
};

export default EntryForm;
