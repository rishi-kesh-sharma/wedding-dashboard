import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';
import { toBase64 } from '@/utils';

const CustomUpload = ({
  fileList,
  setFileList,
  maxFileLength = 1,
  multiple = false,
  text = 'Image',
}) => {
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <>
      <Upload
        multiple={multiple}
        listType="text"
        fileList={fileList}
        onChange={handleChange}
        style={{ display: 'flex !important', gap: '1rem', alignItems: 'center' }}
      >
        <Button disabled={fileList.length >= maxFileLength} size="large" icon={<UploadOutlined />}>
          {text}
        </Button>
      </Upload>
    </>
  );
};
export default CustomUpload;
