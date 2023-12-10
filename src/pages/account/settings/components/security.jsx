import { checkUsername } from '@/pages/user/register/service';
import { Button, Form, Image, Input, Popover, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'umi';
import { updateUser } from '../service';

function UpdateUser({ data, setFetchData }) {
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const FormItem = Form.Item;
  // const validateUsername = async (_, value) => {
  //   const promise = Promise;
  //   if (!value) {
  //     setVisible(!!value);
  //     return promise.reject('Please enter your username!');
  //   }
  //   const res = await checkUsername({ username: value });
  //   if (res.status === 'available') {
  //     return promise.resolve();
  //   } else {
  //     console.log(JSON.stringify(res));
  //     return promise.reject(res.message);
  //   }
  // };

  const onDrop = (e) => {
    setFile(e.file);
  };
  const onChange = (e) => {
    console.log('change fired');
    if (e.file.status == 'removed') {
      setFile(null);
      return;
    }
    setFile(e.file);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
  };

  const onRemove = () => {
    setFile((prev) => {
      return null;
    });
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    formData.append('image', file?.originFileObj || data.Image);
    formData.append('_id', data._id);
    const result = await updateUser(formData);
    setFetchData(true);
    if (result instanceof Error || result.status == 'error') {
      message.error(result.message);
    } else {
      message.success(result.message);
    }
  };
  return (
    <Form
      form={form}
      name="UserRegister"
      // onFinish={onFinish}
      onFinish={(v) => onFinish(v)}
      initialValues={data}
      layout="vertical"
    >
      <FormItem
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'Please input the first name!',
          },
        ]}
      >
        <Input size="large" placeholder="First name" />
      </FormItem>
      <FormItem
        name="lastName"
        label="Last name"
        rules={[
          {
            required: true,
            message: 'Please input the last name!',
          },
        ]}
      >
        <Input size="large" placeholder="Last name" />
      </FormItem>
      {/* <FormItem
        name="username"
        label="Username"
        rules={[
          {
            validator: validateUsername,
          },
        ]}
      >
        <Input size="large" placeholder="Username" />
      </FormItem> */}
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
        name="phoneNumber"
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
      <label>Images</label>
      <Upload
        listType="picture-card"
        // file={file}
        // fileList={file}
        onChange={onChange}
        onPreview={onPreview}
        onRemove={onRemove}
        onDrop={onDrop}
        multiple={false}
        className="m-auto"
      >
        {!file && '+ Upload'}
        {/* +Upload */}
      </Upload>
      {/* <input type="file" name="image" onChange={onChange} /> */}
      {/* {file && <Image src={`${process.env.REACT_APP_API_URL}/${resource?.images[0]}`} width={100} height={100} />} */}
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
