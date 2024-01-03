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
import { proFormEventFieldValidation } from '@/data/util';
import { update } from '@/pages/event/service';
import { UploadOutlined } from '@ant-design/icons';
import CustomUpload from '@/components/CustomUpload';
import useGetFileFromUrl from '@/hooks/useGetFileFromUrl';
import useLoading from '@/hooks/useLoading';
import PageLoading from '@/pages/dashboard/analysis/components/PageLoading';

const BasicInfoEditModal = (props) => {
  const { visible, children, setVisible, current, setFetchResource } = props;
  const [fileList, setFileList] = useState([]);
  const { loading, setLoading } = useLoading();

  console.log(loading, '');

  const files = useGetFileFromUrl({ resource: current, fieldName: 'backgrounds', multiple: true });

  const [form] = Form.useForm();

  const callApi = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('venue', values.venue);
    formData.append('brideName', values.brideName);
    formData.append('groomName', values.groomName);
    formData.append('startDateTime', values.startDateTime);
    formData.append('endDateTime', values.endDateTime);
    formData.append('description', values.description);
    for (const file of fileList) {
      formData.append('backgrounds', file.originFileObj);
    }
    setLoading(true);
    const result = await update(current?._id, formData);
    setLoading(false);
    if (result instanceof Error || result.status == 'error' || result.success == false) {
      message.error(result?.error || result?.error?.message);
    } else {
      message.success(result?.message || 'Updated successfully!!');
      form.resetFields();
      setFileList([]);
    }
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onSubmit = async (values) => {
    await callApi(values);
    setVisible(false);
    setFetchResource(true);
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
      visible={true}
      // title={`Basic Info ${current ? 'Edit' : 'Add'}`}
      className={styles.standardListForm}
      width={520}
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
              <ProFormText
                width="sm"
                label="Bride Name"
                name="brideName"
                rules={proFormEventFieldValidation.brideName}
                placeholder="Please enter bride name"
              />
            </Col>
            <Col span={12}>
              <ProFormText
                width="sm"
                label="Groom Name"
                name="groomName"
                rules={proFormEventFieldValidation.groomName}
                placeholder="Please enter groom name"
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
          <Row>
            <Col>
              <ProForm.Item>
                <CustomUpload
                  multiple="true"
                  maxFileLength={3}
                  text={'Event Images'}
                  setFileList={setFileList}
                  fileList={fileList}
                />
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

export default BasicInfoEditModal;
