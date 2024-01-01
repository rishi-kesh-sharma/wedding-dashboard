import getFormProps from '@/data/getFormProps';
import { proFormEventFieldValidation, regexData } from '@/data/util';
import { save } from '@/pages/event/service';
import ProForm, { ProFormDateTimePicker, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Card, Form, Upload, message } from 'antd';
import React, { useState } from 'react';

const BasicInfoForm = ({ currentId, setCurrentId, setTab }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
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
    formData.append('venue', values.venue);
    formData.append('startDateTime', values.startDateTime);
    formData.append('endDateTime', values.endDateTime);
    formData.append('description', values.description);
    console.log(fileList, 'fileList');
    for (const file of fileList) {
      formData.append('backgrounds', file.originFileObj);
    }

    const formValues = formData.get('backgrounds');
    console.log(formValues, 'formValues');
    try {
      const result = await save(formData);
      if (result instanceof Error || result.status == 'error' || result.success == false) {
        message.error(result?.error || result || result?.message || 'Could not Create Event!!! ');
      } else {
        message.success(result.message || 'Event created successfully!!');
        form.resetFields();
        setFileList([]);
        setCurrentId(result?.data?._id);
        setTab('day-info');
      }
    } catch (err) {
      console.log(err.response.status, 'status');
      message.error('Could not Create Event!!!');
    }
  };
  return (
    <div>
      <ProForm {...getFormProps({ form, onFinish, resource: null })}>
        <ProFormText
          width="lg"
          label="Title"
          name="title"
          rules={proFormEventFieldValidation.title}
          placeholder="Please enter title"
        />
        <ProFormText
          width="lg"
          label="Venue"
          name="venue"
          rules={proFormEventFieldValidation.venue}
          placeholder="Please enter venue"
        />
        <ProFormDateTimePicker
          width={'lg'}
          name="startDateTime"
          label="Start Date and Time"
          rules={proFormEventFieldValidation.startDateTime}
        />
        <ProFormDateTimePicker
          width={'lg'}
          name="endDateTime"
          label="End Date and Time"
          rules={proFormEventFieldValidation.endDateTime}
        />

        <ProFormTextArea
          width={'lg'}
          name="description"
          label="Description"
          placeholder="Please Enter Description"
          rules={proFormEventFieldValidation.description}
        />
        <ProForm.Item style={{ marginLeft: '' }} label="Event Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple="true"
            className="m-auto "
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ProForm.Item>
      </ProForm>
    </div>
  );
};

export default BasicInfoForm;
