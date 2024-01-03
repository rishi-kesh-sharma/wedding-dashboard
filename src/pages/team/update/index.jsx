import { Card, Form, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, update, validateUser, getRoles, save } from '../service';
import React, { useEffect, useState } from 'react';
import getFormProps from '@/data/getFormProps';
import { proFormUserFieldValidation, regexData } from '@/data/util';

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
      history.push('/team/list');
    }
  };

  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Card title="Team member Update Form" bordered={false}>
          <ProForm {...getFormProps({ form, onFinish, resource: resource })}>
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

            {/* <ProFormSelect
              options={proFormRoleOptions}
              width="lg"
              name="role"
              label="Role"
              placeholder="Please select a role"
              rules={proFormUserFieldValidation.role}
              mode="single"
            /> */}
            <ProFormText
              width="lg"
              label="Address"
              name="address"
              rules={proFormUserFieldValidation.address}
              placeholder="Please enter Address"
            />
            {/* <ProFormText.Password
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
            /> */}
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
