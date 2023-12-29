import getFormProps from '@/data/getFormProps';
import { proFormEventFieldValidation, regexData } from '@/data/util';
import { save } from '@/pages/event/service';
import ProForm, {
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Card, Form, Upload, message } from 'antd';
import React, { useState } from 'react';

const BasicInfoForm = ({ currentId, setCurrentId }) => {
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

    const result = await save(formData);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.error || result.error.message);
    } else {
      message.success(result.message);
      form.resetFields();
      setFileList([]);
      setCurrentId(result?.data?._id);
      console.log(result?.data?._id, 'result');
    }
  };

  return (
    <div>
      <Card title="Event Basic Information ">
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
        </ProForm>
      </Card>
    </div>
  );
};

export default BasicInfoForm;

{
  /* <>
<ProFormText
width="lg"
label="Bride Name"
name="brideName"
rules={proFormEventFieldValidation.brideName}
placeholder="Please enter brideName"
/>
<ProFormText
width="lg"
label="Groom Name"
name="groomName"
rules={proFormEventFieldValidation.groomName}
placeholder="Please enter groomName"
/>
<ProFormText
width="lg"
label="Bride Address"
name="bride"
rules={proFormEventFieldValidation.bride}
placeholder="Please enter bride"
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

<ProFormText
width="lg"
label="Address"
name="address"
rules={proFormEventFieldValidation.address}
placeholder="Please enter Address"
/>
</> */
}
