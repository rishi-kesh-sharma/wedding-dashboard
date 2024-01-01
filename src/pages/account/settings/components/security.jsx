import { checkUsername } from '@/pages/user/register/service';
import { Button, Form, Image, Input, Popover, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'umi';
import { update, updateUser } from '../service';

function UpdateUser({ data, setFetchData }) {
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const FormItem = Form.Item;

  // const onDrop = (e) => {
  //   setFile(e.file);
  // };
  // const onChange = (e) => {
  //   console.log('change fired');
  //   if (e.file.status == 'removed') {
  //     setFile(null);
  //     return;
  //   }
  //   setFile(e.file);
  // };
  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  // };

  // const onRemove = () => {
  //   setFile((prev) => {
  //     return null;
  //   });
  // };

  const onFinish = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    formData.append('image', file?.originFileObj || data.Image);
    formData.append('_id', data._id);
    const result = await update(data._id, { ...data, ...values });
    setFetchData(true);
    if (result instanceof Error || result.status == 'error' || result.success == false) {
      message.error(result.message);
    } else {
      message.success(result.message || 'Updated successfully!!');
    }
  };
  return (
    <Form
      form={form}
      name="UserRegister"
      onFinish={(v) => onFinish(v)}
      initialValues={data}
      layout="vertical"
    >
      <FormItem
        name="name"
        label=" Name"
        rules={[
          {
            required: true,
            message: 'Please input the  name!',
          },
        ]}
      >
        <Input size="large" placeholder=" Name" />
      </FormItem>

      <FormItem
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input the email address!',
          },
          {
            type: 'email',
            message: 'Email address format error!',
          },
        ]}
      >
        <Input size="large" placeholder="Email" />
      </FormItem>

      <FormItem
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please enter phone number!',
          },
          {
            pattern: /(\+977)?[9][6-9]\d{8}/,
            message: 'Enter valid phone number!',
          },
        ]}
      >
        <Input size="large" placeholder="eg. 9876543210" />
      </FormItem>
      <FormItem
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: 'Please enter address!',
          },
        ]}
      >
        <Input size="large" placeholder="address" />
      </FormItem>
      {/* <label>Images</label>
      <Upload
        listType="picture-card"
        onChange={onChange}
        onPreview={onPreview}
        onRemove={onRemove}
        onDrop={onDrop}
        multiple={false}
        className="m-auto"
      >
        {!file && '+ Upload'}
      </Upload> */}
      <br />
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateUser;
