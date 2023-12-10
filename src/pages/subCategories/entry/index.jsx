import React, { useEffect, useState } from 'react';
import { Form, Card, message, Select } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getCategory, getSubCategory, save } from '../service';
import getFormProps from '@/data/getFormProps';
import { proFormSubCategoryFieldValidation } from '@/data/util';

const EntryForm = (props) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
    const result = await save({ ...values });
    console.log(result, 'result');
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
    }
  };

  return (
    <PageContainer pageHeaderRender={false}>
      <Card title="Sub Category Entry Form" bordered={false}>
        <ProForm {...getFormProps({ form, onFinish, resource: null })}>
          <ProFormText
            width="lg"
            label="Name"
            name="name"
            rules={proFormSubCategoryFieldValidation.name}
            placeholder="Please enter sub category name"
          />
          <ProFormText
            width="lg"
            label="Alias"
            name="alias"
            rules={proFormSubCategoryFieldValidation.alias}
            placeholder="Please enter sub category alias"
          />
          <ProFormTextArea
            width="lg"
            label="Description"
            name="description"
            rules={proFormSubCategoryFieldValidation.description}
            placeholder="Please enter the description"
          />
          {/* <ProFormSelect
            width="lg"
            name="relatedCategories"
            label="Related Categories"
            request={fetchCategories}
            placeholder="Please select a category"
            rules={[{ required: true, message: 'Please select a category' }]}
          /> */}
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
