import { Card, Form, message } from 'antd';
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
import { proFormSubCategoryFieldValidation } from '@/data/util';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);
  const [form] = Form.useForm();
  const { id } = props.match.params;

  useEffect(() => {
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item);
    };
    getResource(id);
  }, []);

  const onFinish = async (values) => {
    const result = await update({ _id: resource._id, ...values });
    console.log(result);
    if (
      result instanceof Error ||
      result.status == 'error' ||
      !result.success ||
      result.status == 'error'
    ) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
      history.push('/subCategories/list');
    }
  };
  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Card title="Sub Category Update Form" bordered={false}>
          <ProForm {...getFormProps({ form, onFinish, resource })}>
            <ProFormText
              width="lg"
              label="Name"
              name="name"
              value={resource.name}
              rules={proFormSubCategoryFieldValidation.name}
              placeholder="Please enter name"
            />
            <ProFormText
              width="lg"
              label="Alias"
              value={resource.alias}
              name="alias"
              rules={proFormSubCategoryFieldValidation.alias}
              placeholder="Please enter the alias"
            />
            <ProFormTextArea
              width="lg"
              label="Description"
              value={resource.description}
              name="description"
              rules={proFormSubCategoryFieldValidation.description}
              placeholder="Please enter the description"
            />
            {/* <ProFormText
            width="lg"
            label="Related Categories"
            name="relatedCategories"
            rules={[
              {
                required: false,
                message: 'Please enter the Related Categories',
              },
            ]}
            placeholder="Please enter the Related Categories"
          /> */}
            {/* <ProFormSelect
            width="lg"
            name="relatedCategories"
            label="relatedCategories"
            value={resource.relatedCategories}
            request={fetchCategories}
            placeholder="Please select a category"
            rules={[{ required: true, message: 'Please select a category' }]}
     
          /> */}
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
