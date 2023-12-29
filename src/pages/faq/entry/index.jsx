import React, { useState } from 'react';
import { Form, Card, message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { save } from '../service';
import getFormProps from '@/data/getFormProps';
import { proFormFaqFieldValidation } from '@/data/util';

const EntryForm = (props) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const result = await save({ ...values });
    if (result instanceof Error || result.success == false || result.status == 'error') {
      message.error(result.message || 'Could not add!!!');
    } else {
      message.success(result.message || 'Added successfully!!');
      form.resetFields();
      history.push('/faq/list');
    }
  };
  return (
    <PageContainer pageHeaderRender={false}>
      <Card title="FAQ Entry Form">
        <ProForm {...getFormProps({ form, onFinish, resource: null })}>
          <ProFormText
            width="lg"
            label="Question"
            name="question"
            rules={proFormFaqFieldValidation.question}
            placeholder="Please enter question"
          />

          <ProFormText
            width="lg"
            label="Answer"
            name="answer"
            rules={proFormFaqFieldValidation.answer}
            placeholder="Please enter answer"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
