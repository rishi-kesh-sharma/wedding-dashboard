import { Card, Form, message } from 'antd';
import ProForm, { ProFormTextArea } from '@ant-design/pro-form';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, update, validateUser, getRoles } from '../service';
import React, { useEffect, useState } from 'react';
import getFormProps from '@/data/getFormProps';
import { proFormFaqFieldValidation } from '@/data/util';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    const { id } = props.match.params;
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item?.data);
    };
    getResource(id);
  }, []);

  const onFinish = async (values) => {
    const result = await update(resource?._id, { ...values });
    if (result instanceof Error || result.status == 'error' || result.success == false) {
      message.error(result.message || 'Could not update!!');
    } else {
      message.success(result.message || 'Updated successfully!!');
      form.resetFields();
      history.push('/faq/list');
    }
  };
  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Card title="FAQ Update Form" bordered={false}>
          <ProForm {...getFormProps({ form, onFinish, resource: resource })}>
            <ProFormTextArea
              width="lg"
              label="Question"
              name="question"
              rules={proFormFaqFieldValidation.question}
              placeholder="Please enter question"
            />

            <ProFormTextArea
              width="lg"
              label="Answer"
              name="answer"
              rules={proFormFaqFieldValidation.answer}
              placeholder="Please enter answer"
            />
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
