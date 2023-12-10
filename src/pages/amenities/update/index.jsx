import { Card, Form, Image, Upload, message } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, getCategory, getSubCategory, update } from '../service';
import React, { useEffect, useState } from 'react';
import CustomUpload from '@/components/CustomUpload';
import useGetFileFromUrl from '@/hooks/useGetFileFromUrl';
import getFormProps from '@/data/getFormProps';
import { proFormAmenityFieldValidation } from '@/data/util';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const { id } = props.match.params;
  const files = useGetFileFromUrl({ resource });

  const onFinish = async (values) => {
    const { name, alias, relatedPurpose, description } = values;
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
    formData.append('_id', id);

    formData.append('alias', alias);
    // formData.append("relatedPurpose" , relatedPurpose)
    formData.append('description', description);

    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }
    const result = await update(formData);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
      setFileList([]);
      history.push('/amenities/list');
    }
  };

  useEffect(() => {
    const getResource = async (id) => {
      const item = await getById(id);
      console.log(item);
      result instanceof Error || result.status == 'error' || !result.success;
      setResource(item);
    };
    getResource(id);
  }, []);

  useEffect(() => {
    setFileList(files);
  }, [files]);

  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Card title="Amenity Update Form" bordered={false}>
          <ProForm {...getFormProps({ form, onFinish, resource })}>
            <ProFormText
              width="lg"
              label="Name"
              name="name"
              value={resource.name}
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
                value: "sell",
                label: "Sell",
              },
            ]}
            placeholder="Please select purpose"
            rules={[{ required: true, message: 'Please select purpose' }]}
            mode='multiple'
          /> */}

            <ProFormTextArea
              width="lg"
              label="Description"
              name="description"
              rules={proFormAmenityFieldValidation.description}
              placeholder="Please enter the description"
            />

            {/* <ProFormSelect
            width="lg"
            name="relatedCategories"
            label="Category"
            request={fetchCategories}
            placeholder="Please select a category"
            rules={[{ required: true, message: 'Please select a category' }]}
            mode='multiple'
      
          />
     <ProFormSelect
            width="lg"
            name="relatedSubCategories"
            label="relatedSubCategories"
            request={fetchSubCategories}
            placeholder="Please select a sub category"
            rules={[{ required: true, message: 'Please select a sub category' }]}
            mode='multiple'
            
  
          /> */}

            <div>
              <label>Images</label>
              <br />
              <CustomUpload
                fileList={fileList}
                setFileList={setFileList}
                maxFileLength={2}
                multiple={true}
                defaultPreviewTitle="Amenity Image"
              />
            </div>
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
