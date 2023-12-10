import { Card, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, update } from '../service';
import React, { useEffect, useState } from 'react';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const { id } = props.match.params;
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item);
    };
    getResource(id);
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    const result = await update({ _id: resource._id, ...values });
    console.log('resource', result);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      history.push('/resources');
    }
  };

  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Card title="Resource Update Form" bordered={false}>
          <ProForm
            hideRequiredMark={false}
            style={{
              margin: 'auto',
              marginTop: 8,
              maxWidth: 600,
            }}
            name="basic"
            layout="vertical"
            initialValues={resource}
            onFinish={onFinish}
          >
            <ProFormText
              width="lg"
              label="Name"
              name="name"
              value={resource.name}
              rules={[
                {
                  required: true,
                  message: 'Please enter role name',
                },
              ]}
              placeholder="Please enter role name"
            />

            <ProFormText
              width="lg"
              label="Alias"
              name="alias"
              value={resource.alias}
              rules={[
                {
                  required: true,
                  message: 'Please enter the Alias',
                },
              ]}
              placeholder="Please enter role alias"
            />

            <ProFormSelect
              width="lg"
              name="type"
              label="Resource type"
              options={[
                {
                  value: 'api',
                  label: 'Api',
                },
                {
                  value: 'client',
                  label: 'Client',
                },
              ]}
              placeholder="Please select a type"
              rules={[{ required: true, message: 'Please select a type' }]}
              // onChange={(value, e) => setRole({ resourceId: value, resourceAlias: e.label })}
            />
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
