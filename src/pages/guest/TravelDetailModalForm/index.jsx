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
import { proFormT, proFormTravelDetailFieldValidation } from '@/data/util';
import { UploadOutlined } from '@ant-design/icons';

const TravelDetailModalForm = (props) => {
  const { visible, children, setVisible, current, eventId, setFetchResource } = props;
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  if (!visible) {
    return null;
  }

  const onCancel = () => {
    setVisible(false);
  };
  return (
    <ModalForm
      size="small"
      disabled
      visible={visible}
      className={styles.standardListForm}
      width={500}
      readonly
      initialValues={current}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onCancel(),
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
              // rules={proFormTravelDetailFieldValidation.airline}
              placeholder="Please enter title"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Flight Number"
              name="flightNumber"
              // rules={proFormTravelDetailFieldValidation.flightNumber}
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
              // rules={proFormTravelDetailFieldValidation.arrivalDateTime}
              placeholder="Please enter arrival date and time"
            />
          </Col>
          <Col span={12}>
            <ProFormDateTimePicker
              width="sm"
              label="Departure Date and Time"
              name="departureDateTime"
              // rules={proFormTravelDetailFieldValidation.departureDateTime}
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
              // rules={proFormTravelDetailFieldValidation.arrivalPlace}
              placeholder="Please enter arrival place"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Departure Place"
              name="departurePlace"
              // rules={proFormTravelDetailFieldValidation.departurePlace}
              placeholder="Please enter departure place"
            />
          </Col>
        </Row>

        {/* <Row>
          <Col>
            <ProForm.Item>
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
                  Ticket Image
                </Button>
              </Upload>
            </ProForm.Item>
          </Col>
        </Row> */}
      </>
    </ModalForm>
  );
};

export default TravelDetailModalForm;
