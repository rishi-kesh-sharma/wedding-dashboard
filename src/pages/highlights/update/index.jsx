import { Card, Form, Upload, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, getCategory, getSubCategory, update } from '../service';
import React, { useEffect, useState } from 'react';
import CustomUpload from '@/components/CustomUpload';
import useGetFileFromUrl from '@/hooks/useGetFileFromUrl';
import getFormProps from '@/data/getFormProps';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);
  const [fileList, setFileList] = useState([]);
  const { id } = props.match.params;
  const [form] = Form.useForm();

  const file = useGetFileFromUrl({ resource: resource, fieldName: 'image', multiple: false });
  const fetchCategories = async () => {
    const result = await getCategory();
    const options = result.data.map((r) => ({ label: r.name, value: r._id }));
    return options;
  };
  const fetchSubCategories = async () => {
    const result = await getSubCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };

  const onFinish = async (values) => {
    const { name, alias, description } = values;
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
    formData.append('_id', id);

    formData.append('alias', alias);
    formData.append('description', description);

    if (fileList) {
      console.log('hello null', fileList);

      for (const file of fileList) {
        formData.append('image', file.originFileObj);
      }
    }

    const result = await update(formData);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      history.push('/highlights/list');
    }
  };
  useEffect(() => {
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item);
    };
    setFileList(resource?.image);
    getResource(id);
  }, []);
  useEffect(() => {
    setFileList(file);
  }, [file]);
  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Card title="Highlight Update Form" bordered={false}>
          <ProForm {...getFormProps({ form, onFinish, resource })}>
            <ProFormText
              width="lg"
              label="Name"
              name="name"
              value={resource.name}
              rules={[
                {
                  required: true,
                  message: 'Please enter highlight name',
                },
              ]}
              placeholder="Please enter highlight name"
            />
            <ProFormText
              width="lg"
              label="Alias"
              name="alias"
              value={resource.alias}
              rules={[
                {
                  required: true,
                  message: 'Please enter alias',
                },
              ]}
              placeholder="Please enter alias"
            />
            <ProFormTextArea
              width="lg"
              label="description"
              name="description"
              value={resource.description}
              rules={[
                {
                  required: false,
                  message: 'Please enter the description',
                },
              ]}
              placeholder="Please enter the description"
            />
            <ProFormSelect
              width="lg"
              name="relatedCategories"
              label=" Related Categories"
              request={fetchCategories}
              placeholder="Please select a category"
              rules={[{ required: true, message: 'Please select a category' }]}
              mode="multiple"
            />
            <ProFormSelect
              width="lg"
              name="relatedSubCategories"
              label="Related Sub Categories"
              request={fetchSubCategories}
              placeholder="Please select a sub category"
              rules={[{ required: true, message: 'Please select a sub category' }]}
              mode="multiple"
            />

            <div>
              <label>Images</label>
              <br />
              <CustomUpload
                fileList={fileList}
                setFileList={setFileList}
                maxFileLength={1}
                multiple={false}
                defaultPreviewTitle="Highlight Image"
              />
            </div>
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
