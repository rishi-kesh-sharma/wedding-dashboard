import { Button, Form, Input, message } from 'antd';
import { changePassword } from '../service';

const ChangePassword = ({ data }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const result = await changePassword(data?.role, data?._id, { ...data, ...values });
    if (result instanceof Error || result.status == 'error' || result.success == false) {
      message.error(result.message || 'Could not update!!');
    } else {
      message.success(result.message || 'Updated Successfully');
    }
  };
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        name="oldPassword"
        label="Old Password"
        rules={[
          {
            required: true,
            message: 'Please input your old password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          {
            required: true,
            message: 'Please input your new password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        label="Confirm Password"
        dependencies={['newPassword']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

export default ChangePassword;
