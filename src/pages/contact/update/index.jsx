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

  const onFinish = async (values) => {
    const result = await update(resource?.data?._id, { ...values });
    if (result instanceof Error || result.status == 'error' || result.success == false) {
      message.error(result.message || 'Could not update!!');
    } else {
      message.success(result.message || 'Updated successfully!!');
      form.resetFields();
      history.push('/contact/list');
    }
  };
  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Card title="Contact Update " bordered={false}>
          <ProForm {...getFormProps({ form, onFinish: onFinish, resource: resource?.data })}>
            <ProFormText width="lg" label="Name" name="name" />
            <ProFormText width="lg" label="Phone" name="phone" />
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
