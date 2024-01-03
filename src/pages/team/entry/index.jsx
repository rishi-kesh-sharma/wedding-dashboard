import React, { useState } from 'react';
import { Form, Card, message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { save } from '../service';
import getFormProps from '@/data/getFormProps';
import { proFormUserFieldValidation, regexData } from '@/data/util';

const EntryForm = (props) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const result = await save({ ...values, role: 'admin' });
    if (
      result instanceof Error ||
      result.status == 'error' ||
      result.success == false ||
      result.status == 'error'
    ) {
      message.error(result.message || 'Could not update!!');
    } else {
      message.success(result.message || 'Updated successfully!!');
      form.resetFields();
    }
  };
  const checkConfirm = (_, value) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('The passwords do not match!');
    }
    return promise.resolve();
  };
  return (
    <PageContainer pageHeaderRender={false}>
      <Card title="Team Entry Form">
        <ProForm {...getFormProps({ form, onFinish, resource: null })}>
          <ProFormText
            width="lg"
            label="Name"
            name="name"
            rules={proFormUserFieldValidation.name}
            placeholder="Please enter name"
          />
          <ProFormText
            width="lg"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
              {
                type: 'email',
                message: 'Email address format error!',
              },
              {
                pattern: regexData.email,
                message: 'Enter valid email number!',
              },
            ]}
            placeholder="Please enter email"
          />
          <ProFormText
            width="lg"
            label="Phone "
            name="phone"
            rules={[
              {
                pattern: regexData.phone,
                message: 'Enter valid phone !',
              },
            ]}
            placeholder="eg. 9XXXXXXXXX"
          />

          <ProFormText
            width="lg"
            label="Address"
            name="address"
            rules={proFormUserFieldValidation.address}
            placeholder="Please enter Address"
          />
          {/* <ProFormSelect
            options={proFormRoleOptions}
            width="lg"
            name="role"
            label="Role"
            placeholder="Please select a role"
            rules={proFormUserFieldValidation.role}
            mode="single"
          /> */}

          <ProFormText.Password
            width="lg"
            label="Password"
            name="password"
            rules={proFormUserFieldValidation.password}
            placeholder="Please enter password"
          />
          <ProFormText.Password
            width="lg"
            label="Confirm password"
            name="confirm"
            rules={[{ validator: checkConfirm }, ...proFormUserFieldValidation.confirm]}
            placeholder="Please re-enter password"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
