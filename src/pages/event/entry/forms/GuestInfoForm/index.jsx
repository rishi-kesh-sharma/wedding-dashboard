import getFormProps from '@/data/getFormProps';
import { proFormEventFieldValidation, regexData } from '@/data/util';
import ProForm, {
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormItem,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, Card, Divider, Form, Input, Upload, message } from 'antd';
import React, { useState } from 'react';
import ExcelToJsonConverter from './ExcelToJson';
import { saveGuest, saveGuestInBulk } from '@/pages/event/service';

const GuestInfoForm = ({ currentId, setTab }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const result = await saveGuest(currentId, values);
    if (
      result instanceof Error ||
      result.error ||
      result.status == 'error' ||
      result.success == false
    ) {
      message.error(result.error || result.message);
    } else {
      message.success(result.message || 'Guest Information is saved');
      form.resetFields();
    }
  };

  const handleSaveInBulk = async (values) => {
    console.log(values, 'json data');
    const result = await saveGuestInBulk(currentId, JSON.parse(values));
    if (
      result instanceof Error ||
      result.error ||
      result.status == 'error' ||
      result.success == false
    ) {
      message.error(result.error || result.message);
    } else {
      message.success(result.message || 'Guest Information is saved in Bulk');
    }
  };

  return (
    <div>
      <Card title={<ExcelToJsonConverter handleSaveInBulk={handleSaveInBulk} />}>
        {/* <Divider /> */}
        <ProForm
          title={<ExcelToJsonConverter handleSaveInBulk={handleSaveInBulk} />}
          {...getFormProps({ form, onFinish, resource: null })}
        >
          <ProFormText
            width="lg"
            label="Guest Name"
            name="name"
            rules={proFormEventFieldValidation.guest.name}
            placeholder="Please enter Guest name"
          />
          <ProFormText
            width="lg"
            label="Email"
            name="email"
            rules={proFormEventFieldValidation.guest.email}
            placeholder="Please enter the guest email"
          />
          <ProFormText
            width="lg"
            label="Phone"
            name="phone"
            rules={proFormEventFieldValidation.guest.phone}
            placeholder="Please enter the phone"
          />
          <ProFormText
            width="lg"
            label="Address"
            name="address"
            rules={proFormEventFieldValidation.guest.address}
            placeholder="Please enter the address"
          />
        </ProForm>
      </Card>
    </div>
  );
};

export default GuestInfoForm;
