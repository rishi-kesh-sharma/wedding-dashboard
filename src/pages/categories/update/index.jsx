import { Card, Form, Image, Upload, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, getSubCategory, update } from '../service';
import React, { useEffect, useState } from 'react';
import CustomUpload from '@/components/CustomUpload';
import useGetFileFromUrl from '@/hooks/useGetFileFromUrl';
import getFormProps from '@/data/getFormProps';
import { proFormCategoryFieldValidation } from '@/data/util';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const { id } = props.match.params;
  const files = useGetFileFromUrl({ resource });

  const fetchSubCategories = async () => {
    const result = await getSubCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    const subCategory = {};

    formData.append('_id', id);
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
    const result = await update(formData);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
      setFileList([]);
      history.push('/categories/list');
    }
  };
  useEffect(() => {
    const getResource = async (id) => {
      const item = await getById(id);
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
        <Card title="Category Update Form" bordered={false}>
          <ProForm {...getFormProps({ form, onFinish, resource })}>
            <ProFormText
              width="lg"
              label="Name"
              name="name"
              value={resource.name}
              rules={proFormCategoryFieldValidation.name}
              placeholder="Please enter name"
            />
            <ProFormText
              width="lg"
              label="Alias"
              value={resource.alias}
              name="alias"
              rules={proFormCategoryFieldValidation.alias}
              placeholder="Please enter the alias"
            />
            <ProFormTextArea
              width="lg"
              label="Description"
              value={resource.description}
              name="description"
              rules={proFormCategoryFieldValidation.description}
              placeholder="Please enter the description"
            />
            <ProFormSelect
              width="lg"
              name="subCategories"
              label="Sub Categories"
              request={fetchSubCategories}
              placeholder="Please select a sub categories"
              rules={proFormCategoryFieldValidation.subCategories}
              mode="multiple"
            />
            <br />
            <div>
              <label>Images</label>
              <CustomUpload
                fileList={fileList}
                setFileList={setFileList}
                maxFileLength={2}
                multiple={true}
                defaultPreviewTitle="Property Image"
              />
            </div>
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
