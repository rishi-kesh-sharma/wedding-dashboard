import getFormProps from '@/data/getFormProps';
import { proFormEventFieldValidation, regexData } from '@/data/util';
import { saveFriend } from '@/pages/event/service';
import ProForm, {
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormItem,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Card, Divider, Form, Upload, message } from 'antd';
import React, { useState } from 'react';

const FriendsInfoForm = ({ currentId }) => {
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  const onChange = (info) => {
    if (info.file.type.startsWith('image/')) {
      setFileList(info.fileList);
    } else {
      message.error('File type must be image');
    }
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

  const onFinish = async (values) => {
    console.log(values, 'the values');
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('side', values.side);
    formData.append('relation', values.relation);
    formData.append('fbLink', values.fbLink);
    formData.append('instaLink', values.instaLink);
    formData.append('image', fileList?.[0]?.originFileObj);

    const result = await saveFriend(currentId, formData);
    if (
      result instanceof Error ||
      result.error ||
      result.status == 'error' ||
      result.success == false
    ) {
      message.error(result.error || result.message);
    } else {
      message.success(result.message || 'Friend Information is saved');
      form.resetFields();
      setFileList([]);
    }
  };
  return (
    <div>
      <Card title="Friends Information ">
        <ProForm {...getFormProps({ form, onFinish, resource: null })}>
          <ProFormText
            width="lg"
            label="Friend Name"
            name="name"
            rules={proFormEventFieldValidation.friend.name}
            placeholder="Please enter friend name"
          />
          <ProFormSelect
            width="lg"
            label="Side"
            name="side"
            rules={proFormEventFieldValidation.friend.side}
            placeholder="Please enter the side friend belong to"
            options={[
              { value: 'bride', label: 'Bride' },
              {
                value: 'groom',
                value: 'Groom',
              },
            ]}
          />
          <ProFormText
            width="lg"
            label="Relation"
            name="relation"
            rules={proFormEventFieldValidation.friend.relation}
            placeholder="Please enter the relation of friend"
          />
          <ProFormText
            width="lg"
            label="Facebook Link"
            name="fbLink"
            rules={proFormEventFieldValidation.friend.fbLink}
            placeholder="Please enter the facebook link "
          />
          <ProFormText
            width="lg"
            label="Instagram Link"
            name="instaLink"
            rules={proFormEventFieldValidation.friend.instaLink}
            placeholder="Please enter the instagram link "
          />

          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple={false}
            className="m-auto "
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </ProForm>
      </Card>
    </div>
  );
};

export default FriendsInfoForm;
