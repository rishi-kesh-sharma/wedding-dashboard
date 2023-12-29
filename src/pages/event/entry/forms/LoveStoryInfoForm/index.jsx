import getFormProps from '@/data/getFormProps';
import { proFormEventFieldValidation, regexData } from '@/data/util';
import { saveLoveStory } from '@/pages/event/service';
import ProForm, {
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormItem,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Card, Divider, Form, Upload, message } from 'antd';
import React, { useState } from 'react';

const LoveStoryInfoForm = ({ currentId }) => {
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
    formData.append('title', values.title);
    formData.append('dateTime', values.dateTime);
    formData.append('description', values.description);
    formData.append('image', fileList?.[0]?.originFileObj);

    const result = await saveLoveStory(currentId, formData);
    if (
      result instanceof Error ||
      result.error ||
      result.status == 'error' ||
      result.success == false
    ) {
      message.error(result.error || result.message);
    } else {
      message.success(result.message || 'Love Story  is saved');
      form.resetFields();
      setFileList([]);
    }
  };
  return (
    <div>
      <Card title="Love Story Information ">
        <ProForm {...getFormProps({ form, onFinish, resource: null })}>
          <ProFormText
            width="lg"
            label="Title"
            name="title"
            rules={proFormEventFieldValidation.loveStory.title}
            placeholder="Please enter title"
          />

          <ProFormDateTimePicker
            width="lg"
            label="Date and Time"
            name="dateTime"
            rules={proFormEventFieldValidation.loveStory.dateTime}
            placeholder="Please enter date and time"
          />
          <ProFormTextArea
            width="xl"
            label="Description"
            name="description"
            rules={proFormEventFieldValidation.loveStory.description}
            placeholder="Please enter the description"
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

export default LoveStoryInfoForm;
