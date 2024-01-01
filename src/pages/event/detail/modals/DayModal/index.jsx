import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import styles from './styles.less';
import { Button, Col, Form, Result, Row, Upload, message } from 'antd';
import { useState } from 'react';
import { proFormEventFieldValidation } from '@/data/util';
import { saveDay, updateDay } from '@/pages/event/service';
import { UploadOutlined } from '@ant-design/icons';

const DayModal = (props) => {
  const { visible, children, setVisible, current, eventId, setFetchResource } = props;
  const [fileList, setFileList] = useState([]);
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
  const callApi = async (values) => {
    console.log(values, 'the values');
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('location', values.location);
    formData.append('dateTime', values.dateTime);
    formData.append('description', values.description);
    formData.append('image', fileList?.[0]?.originFileObj);

    if (current) {
      const result = await updateDay(current._id, formData);
      if (result instanceof Error || result.status == 'error' || result.success == false) {
        message.error(result.message);
      } else {
        message.success(result.message || 'Updated successfully !!!');
        form.resetFields();
        setFileList([]);
      }
    } else {
      const result = await saveDay(eventId, formData);
      if (result instanceof Error || result.status == 'error' || result.success == false) {
        message.error(result.message);
      } else {
        message.success(result.message || 'Added successfully !!!');
        form.resetFields();
        setFileList([]);
      }
    }
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onSubmit = async (values) => {
    await callApi(values);
    console.log('submitted');
    setFetchResource(true);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }
  return (
    <ModalForm
      size="small"
      visible={visible}
      // title={`Friend Info ${current ? 'Edit' : 'Add'}`}
      className={styles.standardListForm}
      width={650}
      onFinish={async (values) => {
        console.log('finished');
        onSubmit(values);
        console.log(values, 'the values');
      }}
      initialValues={current}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onCancel(),
        onOk: () => onSubmit(),
        destroyOnClose: true,
      }}
    >
      <>
        <Row gutter={3}>
          <Col span={8}>
            <ProFormText
              width="sm"
              label="Title"
              name="title"
              rules={proFormEventFieldValidation.day.title}
              placeholder="Please enter title"
            />
          </Col>
          <Col span={8}>
            <ProFormText
              width="sm"
              label="Location"
              name="location"
              rules={proFormEventFieldValidation.day.location}
              placeholder="Please enter title"
            />
          </Col>
          <Col span={8}>
            <ProFormDateTimePicker
              width="sm"
              label="Date and Time"
              name="dateTime"
              rules={proFormEventFieldValidation.day.dateTime}
              placeholder="Please enter date and time"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ProFormTextArea
              width="xl"
              label="Description"
              name="description"
              rules={proFormEventFieldValidation.day.description}
              placeholder="Please enter the description"
            />
          </Col>
          {/* <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple={false}
            className="m-auto "
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload> */}
        </Row>
        <Row>
          <Col>
            <ProForm.Item label="Day Image">
              <Upload
                // listType="picture-card"
                listType="text"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple={false}
                className=" "
                style={{ display: 'flex !important', gap: '1rem', alignItems: 'center' }}

                // showUploadList={false}
              >
                <Button disabled={fileList.length > 0} size="large" icon={<UploadOutlined />}>
                  Day Image
                </Button>
              </Upload>
            </ProForm.Item>
          </Col>
        </Row>
      </>
    </ModalForm>
  );
};

export default DayModal;
