import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message } from 'antd';
import React, { useState } from 'react';
// import * as XLSX from 'xlsx/xlsx.mjs';
const XLSX = require('xlsx');

function ExcelToJsonConverter({ handleSaveInBulk }) {
  const [jsonData, setJsonData] = useState('');
  const handleChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file imported successfully`);
      const file = info.file.originFileObj;
      console.log(file, 'the file');
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setJsonData(JSON.stringify(json, null, 2));
        };
        reader.readAsBinaryString(file);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleClick = () => {
    handleSaveInBulk(jsonData);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Upload showUploadList={false} accept=".xls,.xlsx" onChange={handleChange}>
        <Button icon={<UploadOutlined />}>Import from Excel file</Button>
      </Upload>
      <Button type="primary" onClick={handleClick}>
        {' '}
        Submit
      </Button>
    </div>
  );
}

export default ExcelToJsonConverter;
