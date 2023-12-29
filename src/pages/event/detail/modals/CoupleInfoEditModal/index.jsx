import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
} from '@ant-design/pro-form';
import styles from './styles.less';
import { Button, Col, Divider, Form, Result, Row, Upload, message } from 'antd';
import { useState } from 'react';
import { proFormEventFieldValidation } from '@/data/util';
import { saveCouple, update, updateCouple } from '@/pages/event/service';

const CoupleInfoEditModal = (props) => {
  // const { done, visible, current, onDone, onSubmit, children } = props;
  const { visible, children, setVisible, current, setFetchResource } = props;
  const [form] = Form.useForm();

  const callApi = async (values) => {
    const formData = new FormData();
    formData.append('brideName', values.brideName);
    formData.append('brideAddress', values.brideAddress);
    formData.append('brideAge', values.brideAge);

    // for (const file of brideFileList) {
    //   formData.append('brideImages', file.originFileObj);
    // }
    formData.append('groomName', values.groomName);
    formData.append('groomAddress', values.groomAddress);
    formData.append('groomAge', values.groomAge);

    // for (const file of groomFileList) {
    //   formData.append('groomImages', file.originFileObj);
    // }

   if(current){
    const result = await updateCouple(current?._id, formData);
    console.log('hello from form');
    if (
      result instanceof Error ||
      result.error ||
      result.status == 'error' ||
      result.success == false
    ) {
      message.error(result.error || result.message);
    } else {
      message.success(result.message || 'Updated Successfully!!');
      form.resetFields();
      // setBrideFileList([]);
      // setGroomFileList([]);
    }
   }else{
    const result = await saveCouple(current?._id, formData);
    console.log('hello from form');
    if (
      result instanceof Error ||
      result.error ||
      result.status == 'error' ||
      result.success == false
    ) {
      message.error(result.error || result.message);
    } else {
      message.success(result.message || 'Added Successfully!!');
      form.resetFields();
      // setBrideFileList([]);
      // setGroomFileList([]);
    }
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
              width="sm"
              label="Name"
              name="brideName"
              rules={proFormEventFieldValidation.brideName}
              placeholder="Please enter bride name"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Bride Address"
              name="brideAddress"
              rules={proFormEventFieldValidation.brideAddress}
              placeholder="Please enter bride address"
            />
          </Col>

          {/* <Upload
        listType="picture-card"
        fileList={brideFileList}
        onChange={onBrideFileChange}
        onPreview={onBrideFilePreview}
        multiple="true"
        className="m-auto "
      >
        {brideFileList.length < 5 && '+ Upload'}
      </Upload> */}
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Groom Name"
              name="groomName"
              rules={proFormEventFieldValidation.groomName}
              placeholder="Please enter groom name"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Groom Address"
              name="groomAddress"
              rules={proFormEventFieldValidation.groomAddress}
              placeholder="Please enter groom address"
            />
          </Col>
          <Col span={12}>
            <ProFormDigit
              style={{ height: '100px !important' }}
              width="sm"
              label="Groom Age"
              name="groomAge"
              // rules={proFormEventFieldValidation.groomAge}
              {...proFormEventFieldValidation.groomAge}
              required={'groom age is required'}
              min={20}
              max={100}
            />
          </Col>
          <Col span={12}>
            <ProFormDigit
              width="sm"
              label="Bride Age"
              name="brideAge"
              {...proFormEventFieldValidation.brideAge}
              required={'bride age is required'}
              min={20}
              max={100}
            />
          </Col>

          {/* <Upload
            listType="picture-card"
            fileList={groomFileList}
            onChange={onGroomFileChange}
            onPreview={onGroomFilePreview}
            multiple="true"
            className="m-auto"
          >
            {groomFileList.length < 5 && '+ Upload'}
          </Upload> */}
        </Row>
      </>
    </ModalForm>
  );
};

export default CoupleInfoEditModal;
