import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import styles from './styles.less';
import { Button, Col, Form, Result, Row, message } from 'antd';
import { useState } from 'react';
import { proFormEventFieldValidation } from '@/data/util';
import { update } from '@/pages/event/service';

const BasicInfoEditModal = (props) => {
  const { visible, children, setVisible, current, setFetchResource } = props;
  const [form] = Form.useForm();

  const callApi = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('venue', values.venue);
    formData.append('startDateTime', values.startDateTime);
    formData.append('endDateTime', values.endDateTime);
    formData.append('description', values.description);
    // for (const file of fileList) {
    //   formData.append('backgrounds', file.originFileObj);
    // }
    // const formValues = formData.get('backgrounds');
    const result = await update(current?._id, formData);
    if (result instanceof Error || result.status == 'error' || result.success == false) {
      message.error(result?.error || result?.error?.message);
    } else {
      message.success(result?.message || 'Updated successfully!!');
      form.resetFields();
      // setFileList([]);
    }
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onSubmit = async (values) => {
    await callApi(values);
    console.log('submitted');
    setVisible(false);
    setFetchResource(true);
  };

  if (!visible) {
    return null;
  }
  return (
    <ModalForm
      size="small"
      visible={true}
      title={`Basic Info ${current ? 'Edit' : 'Add'}`}
      className={styles.standardListForm}
      width={500}
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
        <Row>
          <Col span={12}>
            <ProFormText
              // width="sm"
              width={'sm'}
              label="Title"
              name="title"
              rules={proFormEventFieldValidation.title}
              placeholder="Please enter title"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Venue"
              name="venue"
              rules={proFormEventFieldValidation.venue}
              placeholder="Please enter venue"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <ProFormDateTimePicker
              width={'sm'}
              name="startDateTime"
              label="Start Date and Time"
              rules={proFormEventFieldValidation.startDateTime}
            />
          </Col>
          <Col span={12}>
            <ProFormDateTimePicker
              width={'sm'}
              name="endDateTime"
              label="End Date and Time"
              rules={proFormEventFieldValidation.endDateTime}
            />
          </Col>
        </Row>

        <Row>
          <ProFormTextArea
            width={'lg'}
            name="description"
            label="Description"
            placeholder="Please Enter Description"
            rules={proFormEventFieldValidation.description}
          />
        </Row>
      </>
    </ModalForm>
  );
};

export default BasicInfoEditModal;
