import React, { useEffect, useState } from 'react';
import { Form, Card, message, Select, Upload } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getCategory, getSubCategory, save } from '../service';
import getFormProps from '@/data/getFormProps';
import { proFormAmenityFieldValidation } from '@/data/util';

const EntryForm = (props) => {
  const [fileList, setFileList] = useState([]);

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
    const { name, alias, description } = values;
    const formData = new FormData();
    // const relatedCategoriesObj={}
    // const relatedSubCategoriesObj={}

    // values?.relatedCategories.forEach((relatedCategories, index) => {
    //   relatedCategoriesObj[`relatedCategories[${index}]`] = relatedCategories;
    // });
    // console.log("asd");

    // values?.relatedSubCategories.forEach((relatedSubCategories, index) => {
    //   relatedSubCategoriesObj[`relatedSubCategories[${index}]`] = relatedSubCategories;
    // });

    // for (const key in relatedCategoriesObj) {
    //   formData.append("relatedCategories", relatedCategoriesObj[key]);
    // }

    // for (const key in relatedSubCategoriesObj) {
    //   formData.append("relatedSubCategories", relatedSubCategoriesObj[key]);
    // }

    formData.append('name', name);
    formData.append('alias', alias);
    // formData.append("relatedPurpose" , relatedPurpose)
    formData.append('description', description);

    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }
    console.log(formData.get('relatedSubCategories'));
    const result = await save(formData);
    if (
      result instanceof Error ||
      result.status == 'error' ||
      !result.success ||
      result.status == 'error' ||
      !result.success
    ) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
      setFileList([]);
    }
  };

  return (
    <PageContainer pageHeaderRender={false}>
      <Card title={'Amenity Entry Form'} bordered={false}>
        <ProForm
          // hideRequiredMark
          {...getFormProps({ form, onFinish, resource: null })}
        >
          <ProFormText
            width="lg"
            label="Name"
            name="name"
            rules={proFormAmenityFieldValidation.name}
            placeholder="Please enter amenity name"
          />
          <ProFormText
            width="lg"
            label="Alias"
            name="alias"
            rules={proFormAmenityFieldValidation.alias}
            placeholder="Please enter alias"
          />
          {/*               
             <ProFormSelect
            width="lg"
            name="relatedPurpose"
            label="Purpose"
            options={[
              {
                value: "rent",
                label: "Rent",
              },
              {
                value: "sale",
                label: "Sale",
              },
            ]}
            placeholder="Please select purpose"
            rules={[{ required: true, message: 'Please select purpose' }]}

          /> */}
          <ProFormTextArea
            width="lg"
            label="Description"
            name="description"
            rules={proFormAmenityFieldValidation.description}
            placeholder="Please enter the description"
          />

          {/*                 
              <ProFormSelect
            width="lg"
            name="relatedCategories"
            label="Related Category"
            request={fetchCategories}
            placeholder="Please select a category"
            rules={[{ required: true, message: 'Please select a category' }]}
            mode='multiple'

            // onChange={(value, e) => {
            //   console.log(value, e);
            // }}
          />
     <ProFormSelect
            width="lg"
            name="relatedSubCategories"
            label="Sub Category"
            request={fetchSubCategories}
            placeholder="Please select a sub category"
            rules={[{ required: true, message: 'Please select a sub category' }]}
            mode='multiple'
            
            // onChange={(value, e) => {
            //   console.log(value, e);
            // }}
          /> */}
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
