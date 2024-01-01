import getFormProps, { getSmallFormProps } from '@/data/getFormProps';
import { proFormEventFieldValidation, regexData } from '@/data/util';
import { saveDay } from '@/pages/event/service';
import ProForm, {
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormItem,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Card, Col, Divider, Form, Row, Upload, message } from 'antd';
import React, { useState } from 'react';

const DayInfoForm = ({ currentId, setTab }) => {
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
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('location', values.location);
    formData.append('dateTime', values.dateTime);
    formData.append('description', values.description);
    formData.append('image', fileList?.[0]?.originFileObj);
    const result = await saveDay(currentId, formData);
    if (
      result instanceof Error ||
      result.error ||
      result.status == 'error' ||
      result.success == false
    ) {
      message.error(result.error || result.message);
    } else {
      message.success(result.message || 'Day Information is saved');
      form.resetFields();
      setFileList([]);
      setTab('guest-info');
    }
  };
  return (
    <div>
      {/* <Card > */}
      <ProForm {...getSmallFormProps({ form, onFinish, resource: null })}>
        <ProFormText
          width="lg"
          label="Title"
          name="title"
          rules={proFormEventFieldValidation.day.title}
          placeholder="Please enter title"
        />
        <ProFormText
          width="lg"
          label="Location"
          name="location"
          rules={proFormEventFieldValidation.day.location}
          placeholder="Please enter venue"
        />
        <ProFormDateTimePicker
          width="lg"
          label="Date and Time"
          name="dateTime"
          rules={proFormEventFieldValidation.day.dateTime}
          placeholder="Please enter date and time"
        />
        {/* <Row> */}
        {/* <Col span={40}> */}
        <ProFormTextArea
          width="lg"
          label="Description"
          name="description"
          rules={proFormEventFieldValidation.day.description}
          placeholder="Please enter the description"
        />
        {/* </Col> */}
        {/* </Row> */}

        <ProForm.Item label="Day Image" style={{ marginLeft: '3px' }}>
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
        </ProForm.Item>
      </ProForm>
      {/* </Card> */}
    </div>
  );
};

export default DayInfoForm;
