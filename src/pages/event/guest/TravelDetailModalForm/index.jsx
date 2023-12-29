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
import {
  proFormT,
  proFormTravelDetailFieldValidation,
  proFormTravelDetailFieldValidationravelDetailFieldValidation,
} from '@/data/util';
import { saveDay, updateDay } from '@/pages/event/service';
import { saveTravelDetail, updateTravelDetail } from '../service';

const TravelDetailModalForm = (props) => {
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
    const formData = new FormData();
    formData.append('airline', values.airline);
    formData.append('flightNumber', values.flightNumber);
    formData.append('arrivalDateTime', values.arrivalDateTime);
    formData.append('departureDateTime', values.departureDateTime);
    formData.append('arrivalPlace', values.arrivalPlace);
    formData.append('departurePlace', values.departurePlace);
    formData.append('email', values.email);
    formData.append('ticketImage', fileList?.[0]?.originFileObj);
    if (current) {
      const result = await updateTravelDetail(current._id, formData);
      if (result instanceof Error || result.status == 'error' || result.success == false) {
        message.error(result.message || 'Could not update!!!');
      } else {
        message.success(result.message || 'Updated successfully !!!');
        form.resetFields();
        setFileList([]);
      }
    } else {
      try {
        const result = await saveTravelDetail(eventId, formData);
        console.log(result, 'result');
        if (result instanceof Error || result.status == 'error' || result.success == false) {
          message.error(result.message || 'Could not update!!!');
        } else {
          message.success(result.message || 'Added successfully !!!');
          form.resetFields();
          setFileList([]);
        }
      } catch (err) {
        console.log(err, 'error');
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

  console.log(current, 'current');
  return (
    <ModalForm
      size="small"
      visible={visible}
      title={`Travel Detail Info ${current ? 'Edit' : 'Add'}`}
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
              label="Airline Name"
              name="airline"
              rules={proFormTravelDetailFieldValidation.airline}
              placeholder="Please enter title"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Flight Number"
              name="flightNumber"
              rules={proFormTravelDetailFieldValidation.flightNumber}
              placeholder="Please enter flight number"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <ProFormDateTimePicker
              width="sm"
              label="Arrival Date Time"
              name="arrivalDateTime"
              rules={proFormTravelDetailFieldValidation.arrivalDateTime}
              placeholder="Please enter arrival date and time"
            />
          </Col>
          <Col span={12}>
            <ProFormDateTimePicker
              width="sm"
              label="Departure Date and Time"
              name="departureDateTime"
              rules={proFormTravelDetailFieldValidation.departureDateTime}
              placeholder="Please enter the departure date and time"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Arrival Place"
              name="arrivalPlace"
              rules={proFormTravelDetailFieldValidation.arrivalPlace}
              placeholder="Please enter arrival place"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Departure Place"
              name="departurePlace"
              rules={proFormTravelDetailFieldValidation.departurePlace}
              placeholder="Please enter departure place"
            />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Email"
              name="email"
              rules={proFormTravelDetailFieldValidation.email}
              placeholder="Please enter email"
            />
          </Col>
        </Row>

        <Row>
          <p>Ticket Image</p>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple={false}
            className="m-auto "
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </Row>
      </>
    </ModalForm>
  );
};

export default TravelDetailModalForm;
