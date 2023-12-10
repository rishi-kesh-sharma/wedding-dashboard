import { Card, Form, Image, Upload, message } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useRequest, history, useHistory } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, update } from '../service';
import React, { useEffect, useState } from 'react';
import CustomUpload from '@/components/CustomUpload';
import useGetFileFromUrl from '@/hooks/useGetFileFromUrl';
import getFormProps from '@/data/getFormProps';
import { proFormBlogFieldValidation } from '@/data/util';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [id, setId] = useState(null);
  const files = useGetFileFromUrl({ resource });

  const onFinish = async (values) => {
    const formData = new FormData();
    try {
      if (values.tags) {
        if (!Array.isArray(values.tags)) {
          const tagsArray = values.tags.split(',').map((tag) => tag.trim());
          formData.append('tags', JSON.stringify(tagsArray));
        }
        formData.append('tags', JSON.stringify(values.tags));
      }
      if (values.keywords) {
        if (!Array.isArray(values.keywords)) {
          const keywordsArray = values.keywords.split(',').map((tag) => tag.trim());
          formData.append('keywords', JSON.stringify(keywordsArray));
        }
        formData.append('keywords', JSON.stringify(values.keywords));
      }

      if (values.meta_tag) {
        if (!Array.isArray(values.meta_tag)) {
          const meta_tagArray = values.meta_tag.split(',').map((tag) => tag.trim());
          formData.append('meta_tag', JSON.stringify(meta_tagArray));
        }
        formData.append('meta_tag', JSON.stringify(values.meta_tag));
      }
      formData.append('title', values.title);
      formData.append('_id', id);
      formData.append('short_description', values.short_description);
      formData.append('slug_url', values.slug_url);
      formData.append('description', values.description);
      formData.append('meta_description', values.meta_description);

      for (const file of fileList) {
        formData.append('images', file.originFileObj);
      }
      const result = await update(formData);
      if (result instanceof Error || result.status == 'error' || !result.success) {
        message.error(result.message);
      } else {
        console.log(result.message, 'message result');
        message.success(result?.message);
        history.push('/blogs/list');
      }
    } catch (error) {
      message.error('failed to update data', error);
    }
  };

  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      setId(id);
    }
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item);
    };
    getResource(id);
  }, [id]);
  useEffect(() => {
    setFileList(files);
  }, [files]);
  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Card title="Blog Update Form" bordered={false}>
          <ProForm {...getFormProps({ form, onFinish, resource })}>
            <ProFormText
              width="lg"
              label="Title"
              name="title"
              value={resource?.title || ''}
              rules={proFormBlogFieldValidation.title}
              placeholder="Please enter  title"
            />

            <ProFormText
              width="lg"
              label="keywords"
              name="keywords"
              value={resource?.keywords}
              rules={proFormBlogFieldValidation.keywords}
              placeholder="Please enter keywords"
            />
            <ProFormText
              width="lg"
              label="Short Description"
              value={resource?.short_description}
              name="short_description"
              rules={proFormBlogFieldValidation.short_description}
              placeholder="Please enter short description"
            />
            <ProFormText
              width="lg"
              name="tags"
              label="tags"
              value={resource.tags}
              placeholder="Please select tags"
              rules={proFormBlogFieldValidation.tags}
            />
            <ProFormText
              width="lg"
              name="meta_tag"
              label="Meta Tags"
              value={resource.meta_tag}
              placeholder="Please select meta tags"
              rules={proFormBlogFieldValidation.meta_tags}
            />
            <ProFormText
              width="lg"
              label="slug Url"
              name="slug_url"
              value={resource.slug_url}
              rules={proFormBlogFieldValidation.slug_url}
              placeholder="Please enter slug Url"
            />
            <ProFormTextArea
              width="lg"
              name="meta_description"
              label="Meta Descriptions"
              value={resource.meta_description}
              placeholder="Please select meta description"
              rules={proFormBlogFieldValidation.meta_description}
            />
            <ProFormTextArea
              width="lg"
              label="Description"
              name="description"
              value={resource?.description}
              rows={8}
              rules={proFormBlogFieldValidation.description}
              placeholder="Please enter description"
            />
            <br />
            <div>
              <label>Image</label>
              <CustomUpload
                fileList={fileList}
                setFileList={setFileList}
                maxFileLength={5}
                multiple={true}
                defaultPreviewTitle="Blog Image"
              />
            </div>
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
