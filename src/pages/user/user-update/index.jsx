import { Card, Form, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, update, validateUser, getRoles } from '../service';
import React, { useEffect, useState } from 'react';
import getFormProps from '@/data/getFormProps';
import { proFormUserFieldValidation, regexData } from '@/data/util';

const EditForm = (props) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [form] = Form.useForm();
  const fetchRoles = async () => {
    const result = await getRoles();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };

  useEffect(() => {
    const { id } = props.match.params;
    const getUser = async (id) => {
      const item = await getById(id);
      setUser(item);
      setRole({ value: item.roleId, label: item.roleAlias });
    };
    getUser(id);
  }, []);

  const { run } = useRequest(update, {
    manual: true,
    onSuccess: (x) => {
      message.success('User is saved', x);
      history.push('/users/list');
    },
    onError: (e) => {
      console.log(e);
      message.error('Error happened ', e);
    },
  });

  const onFinish = async (values) => {
    const { username, ...others } = values;
    run({ _id: user._id, ...others, username });
  };

  return (
    user && (
      <PageContainer pageHeaderRender={false}>
        <Card title="User Update Form" bordered={false}>
          <ProForm {...getFormProps({ form, onFinish, resource: user })}>
            <ProFormText
              width="lg"
              label="First name"
              name="firstName"
              value={user.firstName}
              rules={proFormUserFieldValidation.lastName}
              placeholder="Please enter first name"
            />
            <ProFormText
              width="lg"
              label="Last name"
              name="lastName"
              value={user?.lastName}
              rules={proFormUserFieldValidation.lastName}
              placeholder="Please enter last name"
            />

            <ProFormText
              width="lg"
              label="Username"
              name="username"
              fullField="Username"
              value={user.username}
              disabled
              rules={[
                {
                  // validator: validateUser,
                  // validateTrigger: (e) => {
                  //   console.log(e);
                  //   return 'blue';
                  // },
                },
                ...proFormUserFieldValidation.username,
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
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
