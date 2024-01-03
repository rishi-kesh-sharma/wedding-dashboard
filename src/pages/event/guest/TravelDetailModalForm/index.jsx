import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import styles from './styles.less';
import { Button, Col, Form, Result, Row, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { proFormT, proFormTravelDetailFieldValidation } from '@/data/util';
import { saveDay, updateDay } from '@/pages/event/service';
import { saveTravelDetail, updateTravelDetail } from '../service';
import { UploadOutlined } from '@ant-design/icons';
import useGetFileFromUrl from '@/hooks/useGetFileFromUrl';
import CustomUpload from '@/components/CustomUpload';
import useLoading from '@/hooks/useLoading';
import PageLoading from '@/pages/dashboard/analysis/components/PageLoading';

const TravelDetailModalForm = (props) => {
  const { visible, children, setVisible, current, eventId, setFetchResource } = props;
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const { loading, setLoading } = useLoading();

  const files = useGetFileFromUrl({ resource: current, fieldName: 'ticketImage' });

  const callApi = async (values) => {
    const formData = new FormData();
    formData.append('airline', values.airline);
    formData.append('flightNumber', values.flightNumber);
    formData.append('arrivalDateTime', values.arrivalDateTime);
    formData.append('departureDateTime', values.departureDateTime);
    formData.append('arrivalPlace', values.arrivalPlace);
    formData.append('departurePlace', values.departurePlace);
    formData.append('email', current?.email);
    formData.append('ticketImage', fileList?.[0]?.originFileObj);
    setLoading(true);
    if (current) {
      const result = await updateTravelDetail(eventId, formData);
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
        console.log(result, 'result data');
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
    setLoading(false);
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

  useEffect(() => {
    setFileList(files);
  }, [files]);

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
      {!loading ? (
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
            <Col>
              <ProForm.Item>
                <CustomUpload text={'Ticket Image'} setFileList={setFileList} fileList={fileList} />
              </ProForm.Item>
            </Col>
          </Row>
        </>
      ) : (
        <PageLoading />
      )}
    </ModalForm>
  );
};

export default TravelDetailModalForm;
