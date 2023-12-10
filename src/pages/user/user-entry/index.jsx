import React, { useState } from 'react';
import { Form, Card, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { save, getRoles, check as checkUser, validateUser } from '../service';
import getFormProps from '@/data/getFormProps';
import { proFormFieldValidation, regexData } from '@/data/util';

const EntryForm = (props) => {
  const [form] = Form.useForm();
  const [role, setRole] = useState(null);

  // get roles
  const fetchRoles = async () => {
    const result = await getRoles();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };

  const onFinish = async (values) => {
    console.log(values, form);
    const result = await save({ ...values, roleAlias: role.roleAlias });

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
      setRole(null);
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
      <Card title="User Entry Form">
        <ProForm {...getFormProps({ form, onFinish, resource: null })}>
          <ProFormText
            width="lg"
            label="First name"
            name="firstName"
            rules={proFormFieldValidation.firstName}
            placeholder="Please enter first name"
          />

          <ProFormText
            width="lg"
            label="Last name"
            name="lastName"
            rules={proFormFieldValidation.lastName}
            placeholder="Please enter last name"
          />

          <ProFormText
            width="lg"
            label="Username"
            name="username"
            fullField="Username"
            rules={[
              {
                validator: validateUser,
              },
              ...proFormFieldValidation.username,
            ]}
            placeholder="Please enter username"
          />

          <ProFormText
            width="lg"
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                pattern: regexData.phone,
                message: 'Enter valid phone number!',
              },
            ]}
            placeholder="eg. 9XXXXXXXXX"
          />

          <ProFormText
            width="lg"
            label="Email"
            name="email"
            rules={[
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

          <ProFormSelect
            width="lg"
            name="roleId"
            label="Role"
            request={fetchRoles}
            placeholder="Please select a role"
            rules={[{ required: true, message: 'Please select role' }]}
            onChange={(value, e) => setRole({ roleId: value, roleAlias: e.label })}
          />

          <ProFormText.Password
            width="lg"
            label="Password"
            name="password"
            rules={proFormFieldValidation.password}
            placeholder="Please enter password"
          />

          <ProFormText.Password
            width="lg"
            label="Confirm password"
            name="confirm"
            rules={[{ validator: checkConfirm }, ...proFormFieldValidation.confirm]}
            placeholder="Please re-enter password"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
