import { Card, Form, Image, Upload, message } from 'antd';
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
import { getById, getCategory, getSubCategory, update } from '../service';
import React, { useEffect, useState } from 'react';
import GoogleMapComponent from '@/data/GoogleMapComponent';
import getFormProps from '@/data/getFormProps';

const EditForm = (props) => {
  const [form] = Form.useForm();
  const { id } = props.match.params;
  const [resource, setResource] = useState(null);
  useEffect(() => {
    const getResource = async (id) => {
      const item = await getById(id);
      console.log(item);
      setResource(item);
    };
    getResource(id);
  }, []);

  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Card title="Contact Display Form" bordered={false}>
          <ProForm {...getFormProps({ form, onFinish: null, resource })}>
            <ProFormText disabled width="lg" label="Name" name="name" value={resource.name} />
            <ProFormText disabled width="lg" label="Email" name="email" value={resource.email} />
            <ProFormText disabled width="lg" label="Phone" name="phone" value={resource.phone} />
            <ProFormText
              disabled
              width="lg"
              label="Subject"
              name="subject"
              value={resource.subject}
            />
            <ProFormText
              disabled
              width="lg"
              label="Description"
              name="description"
              value={resource.description}
            />
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
