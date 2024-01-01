import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import styles from './styles.less';
import { Button, Col, Form, Result, Row, Upload, message } from 'antd';
import { useState } from 'react';
import { proFormT, proFormRoomFieldValidation } from '@/data/util';
import { saveDay, updateDay } from '@/pages/event/service';
import { saveRoomDetail, updateRoomDetail } from '../../service';
import { UploadOutlined } from '@ant-design/icons';

const RoomDetailModalForm = (props) => {
  const { visible, children, setVisible, current, eventId, setFetchResource } = props;
  const [form] = Form.useForm();
  const guestId = current?._id;

  const callApi = async (values) => {
    if (current) {
      const result = await updateRoomDetail({ guestId, eventId }, values);
      if (result instanceof Error || result.status == 'error' || result.success == false) {
        message.error(result.message || 'Could not update!!!');
      } else {
        message.success(result.message || 'Updated successfully !!!');
        form.resetFields();
      }
    } else {
      try {
        const result = await saveRoomDetail({ guestId, eventId }, values);
        if (result instanceof Error || result.status == 'error' || result.success == false) {
          message.error(result.message || 'Could not update!!!');
        } else {
          message.success(result.message || 'Assigned successfully !!!');
          form.resetFields();
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

  return (
    <ModalForm
      size="small"
      visible={visible}
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
              label="Hotel Name"
              name="hotel"
              rules={proFormRoomFieldValidation.hotel}
              placeholder="Please enter hotel name"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Room No"
              name="roomNo"
              rules={proFormRoomFieldValidation.roomNo}
              placeholder="Please enter room number"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <ProFormDatePicker
              width="sm"
              label="Check in Date "
              name="checkInDate"
              rules={proFormRoomFieldValidation.checkInDate}
              placeholder="Please enter check in date "
            />
          </Col>
          <Col span={12}>
            <ProFormDatePicker
              width="sm"
              label="Check out Date "
              name="checkOutDate"
              rules={proFormRoomFieldValidation.checkInDate}
              placeholder="Please enter check out date "
            />
          </Col>
        </Row>
      </>
    </ModalForm>
  );
};

export default RoomDetailModalForm;
