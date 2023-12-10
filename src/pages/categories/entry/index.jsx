import React, { useEffect, useState } from 'react';
import { Form, Card, message, Select, Upload } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getCategory, getSubCategory, save } from '../service';
import { Municipality } from '@/data/Municipalities';
import { Districts } from '@/data/Districts';
import GoogleMapComponent from '@/data/GoogleMapComponent';
import getFormProps from '@/data/getFormProps';
import { proFormCategoryFieldValidation } from '@/data/util';

const EntryForm = (props) => {
  const [fileList, setFileList] = useState([]);

  ////function f=s for picking the location of the doctors
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
  const fetchSubCategories = async () => {
    const result = await getSubCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const onFinish = async (values) => {
    const formData = new FormData();
    const subCategory = {};
    // for (const key in values) {
    //   formData.append(key, values[key]);
    // }
    formData.append('name', values.name);
    formData.append('alias', values.alias);
    formData.append('description', values.description);

    values.subCategories.map((value, index) => {
      subCategory[`subCategories[${index}]`] = value;
    });
    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }
    for (const key in subCategory) {
      formData.append('subCategories', subCategory[key]);
    }
    console.log(formData.get('images'));
    const result = await save(formData);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
      setFileList([]);
    }
  };

  return (
    <PageContainer pageHeaderRender={false}>
      <Card title={'Category Entry Form'} bordered={false}>
        <ProForm {...getFormProps({ form, onFinish, resource: null })}>
          <ProFormText
            width="lg"
            label="Name"
            name="name"
            rules={proFormCategoryFieldValidation.name}
            placeholder="Please enter  name"
          />

          <ProFormText
            width="lg"
            label="Alias"
            name="alias"
            rules={proFormCategoryFieldValidation.alias}
            placeholder="Please enter  alias"
          />

          <ProFormSelect
            width="lg"
            name="subCategories"
            label="Sub Categories"
            request={fetchSubCategories}
            placeholder="Please select a category"
            rules={proFormCategoryFieldValidation.subCategories}
            mode="multiple"
          />
          <ProFormTextArea
            width="lg"
            label="Description"
            name="description"
            rules={proFormCategoryFieldValidation.description}
            placeholder="Please enter the description"
          />
          <div>
            <label>Images</label>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              multiple="true"
              className="m-auto"
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </div>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
