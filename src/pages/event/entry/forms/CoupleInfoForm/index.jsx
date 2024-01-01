import getFormProps from '@/data/getFormProps';
import { proFormEventFieldValidation, regexData } from '@/data/util';
import { saveCouple } from '@/pages/event/service';
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

const CoupleInfoForm = ({ currentId, setTab }) => {
  const [brideFileList, setBrideFileList] = useState([]);
  const [groomFileList, setGroomFileList] = useState([]);

  const [form] = Form.useForm();
  const onBrideFileChange = (info) => {
    if (info.file.type.startsWith('image/')) {
      setBrideFileList(info.fileList);
    } else {
      message.error('File type must be image');
    }
  };
  const onBrideFilePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
  };
  const onGroomFileChange = (info) => {
    if (info.file.type.startsWith('image/')) {
      setGroomFileList(info.fileList);
    } else {
      message.error('File type must be image');
    }
  };
  const onGroomFilePreview = async (file) => {
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
    formData.append('brideName', values.brideName);
    formData.append('brideAddress', values.brideAddress);
    formData.append('brideAge', values.brideAge);

    for (const file of brideFileList) {
      formData.append('brideImages', file.originFileObj);
    }
    formData.append('groomName', values.groomName);
    formData.append('groomAddress', values.groomAddress);
    formData.append('groomAge', values.groomAge);

    for (const file of groomFileList) {
      formData.append('groomImages', file.originFileObj);
    }

    const result = await saveCouple(currentId, formData);
    console.log('hello from form');
    if (
      result instanceof Error ||
      result.error ||
      result.status == 'error' ||
      result.success == false
    ) {
      message.error(result.error || result.message);
    } else {
      message.success(result.message || 'Couple Information is saved');
      form.resetFields();
      setBrideFileList([]);
      setGroomFileList([]);
      setTab('day-info');
    }
  };
  return (
    <div>
      <Card title="Couple Information ">
        <ProForm {...getFormProps({ form, onFinish, resource: null })}>
          <ProFormText
            width="lg"
            label="Bride Name"
            name="brideName"
            rules={proFormEventFieldValidation.brideName}
            placeholder="Please enter bride name"
          />

          <ProFormText
            width="lg"
            label="Bride Address"
            name="brideAddress"
            rules={proFormEventFieldValidation.brideAddress}
            placeholder="Please enter bride address"
          />
          <ProFormText
            type="number"
            width="lg"
            label="Bride Age"
            name="brideAge"
            // rules={proFormEventFieldValidation.brideAge}
            {...proFormEventFieldValidation.brideAge}
            required={'bride age is required'}
            min={20}
            max={100}
          />

          <Upload
            listType="picture-card"
            fileList={brideFileList}
            onChange={onBrideFileChange}
            onPreview={onBrideFilePreview}
            multiple="true"
            className="m-auto "
          >
            {brideFileList.length < 5 && '+ Upload'}
          </Upload>
          <Divider />
          <ProFormText
            width="lg"
            label="Groom Name"
            name="groomName"
            rules={proFormEventFieldValidation.groomName}
            placeholder="Please enter groom name"
          />

          <ProFormText
            width="lg"
            label="Groom Address"
            name="groomAddress"
            rules={proFormEventFieldValidation.groomAddress}
            placeholder="Please enter groom address"
          />
          <ProFormDigit
            width="lg"
            label="Groom Age"
            name="groomAge"
            // rules={proFormEventFieldValidation.groomAge}
            {...proFormEventFieldValidation.groomAge}
            required={'groom age is required'}
            min={20}
            max={100}
          />
          <Upload
            listType="picture-card"
            fileList={groomFileList}
            onChange={onGroomFileChange}
            onPreview={onGroomFilePreview}
            multiple="true"
            className="m-auto"
          >
            {groomFileList.length < 5 && '+ Upload'}
          </Upload>
        </ProForm>
      </Card>
    </div>
  );
};

export default CoupleInfoForm;

{
  /* <>
<ProFormText
width="lg"
label="groom Name"
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
