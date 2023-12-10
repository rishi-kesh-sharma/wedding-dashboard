import React, { useEffect, useRef, useState } from 'react';
import { Form, Card, message, Select, Upload } from 'antd';
import ProForm, { ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getCategory, getSubCategory, save } from '../service';
import getFormProps from '@/data/getFormProps';
import { proFormHighlightFieldValidation } from '@/data/util';

const EntryForm = (props) => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const fetchCategories = async () => {
    const result = await getCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));

    return options;
  };
  const fetchSubCategories = async () => {
    const result = await getSubCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const [form] = Form.useForm();

  const onChange = (e) => {
    setImage(e.target.files[0]);
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

  const handleResetImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.type = 'text';
      fileInputRef.current.type = 'file';
    }
  };

  const onFinish = async (values) => {
    const { name, alias, relatedPurpose, description } = values;
    const formData = new FormData();
    const relatedCategoriesObj = {};
    const relatedSubCategoriesObj = {};

    values?.relatedCategories.forEach((relatedCategories, index) => {
      relatedCategoriesObj[`relatedCategories[${index}]`] = relatedCategories;
    });

    values?.relatedSubCategories.forEach((relatedSubCategories, index) => {
      relatedSubCategoriesObj[`relatedSubCategories[${index}]`] = relatedSubCategories;
    });

    for (const key in relatedCategoriesObj) {
      formData.append('relatedCategories', relatedCategoriesObj[key]);
    }

    for (const key in relatedSubCategoriesObj) {
      formData.append('relatedSubCategories', relatedSubCategoriesObj[key]);
    }

    formData.append('name', name);
    formData.append('alias', alias);
    formData.append('description', description);
    formData.append('image', image);
    for (var pair of formData.entries()) {
      console.log(pair[0] + '====== ' + pair[1]);
    }
    const result = await save(formData);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      handleResetImage();
      form.resetFields();
    }
  };
  return (
    <PageContainer pageHeaderRender={false}>
      <Card title="Highlight Entry Form" bordered={false}>
        <ProForm {...getFormProps({ form, onFinish, resource: null })}>
          <ProFormText
            width="lg"
            label="Name"
            name="name"
            rules={proFormHighlightFieldValidation.name}
            placeholder="Please enter highlight name"
          />
          <ProFormText
            width="lg"
            label="Alias"
            name="alias"
            rules={proFormHighlightFieldValidation.alias}
            placeholder="Please enter alias"
          />

          <ProFormSelect
            width="lg"
            name="relatedCategories"
            label="Related Category"
            request={fetchCategories}
            placeholder="Please select a category"
            rules={proFormHighlightFieldValidation.relatedCategories}
            mode="multiple"
          />
          <ProFormSelect
            width="lg"
            name="relatedSubCategories"
            label="Sub Category"
            request={fetchSubCategories}
            placeholder="Please select a sub category"
            rules={proFormHighlightFieldValidation.relatedSubCategories}
            mode="multiple"

            // onChange={(value, e) => {
            //   console.log(value, e);
            // }}
          />
          <ProFormTextArea
            width="lg"
            label="Description"
            name="description"
            rules={proFormHighlightFieldValidation.description}
            placeholder="Please enter the description"
          />
          <div>
            <label>Images</label>
            {/* <Upload
            listType="picture-card"
            image={image}
            onChange={onChange}
            onPreview={onPreview}
            multiple="true"
            className="m-auto"
          >
            {image.length < 5 && '+ Upload'}
          </Upload> */}
            <input ref={fileInputRef} type="file" name="image" onChange={onChange} />
          </div>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
