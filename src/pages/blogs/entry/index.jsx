import React, { useEffect, useState } from 'react';
import { Form, Card, message, Select, Upload } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getCategory, getLoggedInUser, getSubCategory, save } from '../service';
import getFormProps from '@/data/getFormProps';
import { proFormBlogFieldValidation } from '@/data/util';

const EntryForm = (props) => {
  const [user, setUser] = useState(null);
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();

  const loggedInUser = async () => {
    const response = await getLoggedInUser();
    setUser(response);
  };

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
    if (values.tags) {
      const tagsArray = values.tags.split(',').map((tag) => tag.trim());
      formData.append('tags', JSON.stringify(tagsArray));
    }

    if (values.keywords) {
      const keywordsArray = values.keywords.split(',').map((key) => key.trim());
      formData.append('keywords', JSON.stringify(keywordsArray));
    }

    if (values.meta_tag) {
      const metaTagsArray = values.meta_tag.split(',').map((key) => key.trim());
      console.log(JSON.stringify(metaTagsArray));
      formData.append('meta_tag', JSON.stringify(metaTagsArray));
    }
    formData.append('title', values.title);
    formData.append('short_description', values.short_description);
    formData.append('slug_url', values.slug_url);
    formData.append('author', user?._id);
    formData.append('description', values.description);
    formData.append('meta_description', values.meta_description);

    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }

    const result = await save(formData);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
      setFileList([]);
    }
  };
  useEffect(() => {
    loggedInUser();
  }, []);
  return (
    <PageContainer pageHeaderRender={false}>
      <Card title="Blog Entry Form" bordered={false}>
        <ProForm {...getFormProps({ form, onFinish, resource: null })}>
          <ProFormText
            width="lg"
            label="Title"
            name="title"
            rules={proFormBlogFieldValidation.title}
            placeholder="Please enter title"
          />

          <ProFormText
            width="lg"
            name="short_description"
            label="Short Description"
            placeholder="Please select Short Description"
            rules={proFormBlogFieldValidation.short_description}
          />
          <ProFormText
            width="lg"
            label="Tags"
            name="tags"
            rules={proFormBlogFieldValidation.tags}
            placeholder="Please enter the tags"
          />
          <ProFormText
            width="lg"
            label="slug Url"
            name="slug_url"
            rules={proFormBlogFieldValidation.slug_url}
            placeholder="Please enter slug Url"
          />
          <ProFormText
            width="lg"
            label="keywords"
            name="keywords"
            rules={proFormBlogFieldValidation.keywords}
            placeholder="Please enter keywords"
          />
          <ProFormText
            width="lg"
            label="Meta Tags"
            name="meta_tag"
            rules={proFormBlogFieldValidation.meta_tags}
            placeholder="Please enter MetaTags"
          />
          <ProFormTextArea
            width="lg"
            label="MetaDescription"
            name="meta_description"
            rules={proFormBlogFieldValidation.meta_description}
            placeholder="Please enter MetaDescription"
          />
          <ProFormTextArea
            width="lg"
            label="Description"
            name="description"
            rules={proFormBlogFieldValidation.description}
            placeholder="Please enter description"
          />
          <div>
            <label>Image</label>
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
