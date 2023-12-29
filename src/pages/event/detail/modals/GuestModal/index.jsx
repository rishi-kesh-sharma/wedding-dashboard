import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import styles from './styles.less';
import { Button, Col, Form, Result, Row, Upload, message } from 'antd';
import { proFormEventFieldValidation, proFormUserFieldValidation, regexData } from '@/data/util';
import { save, update } from '@/pages/event/guest/service';

const GuestModal = (props) => {
  const { visible, children, setVisible, current, eventId, setFetchResource } = props;
  const [form] = Form.useForm();

  const onCancel = () => {
    setVisible(false);
  };
  const callApi = async (values) => {
    if (current) {
      const result = await update(current?._id, { ...values });
      if (
        result instanceof Error ||
        result.status == 'error' ||
        result.success == false ||
        result.status == 'error'
      ) {
        message.error(result.message);
      } else {
        message.success(result.message || 'Updated Successfully');
        form.resetFields();
      }
    } else {
      const result = await save(eventId, { ...values });
      if (
        result instanceof Error ||
        result.status == 'error' ||
        result.success == false ||
        result.status == 'error'
      ) {
        message.error(result.message);
      } else {
        message.success(result.message || 'Added successfully');
        form.resetFields();
      }
    }
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
      title={`Friend Info ${current ? 'Edit' : 'Add'}`}
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
              name="name"
              rules={proFormUserFieldValidation.name}
              placeholder="Please enter name"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                },
                {
                  type: 'email',
                  message: 'Email address format error!',
                },
                {
                  pattern: regexData.email,
                  message: 'Enter valid email number!',
                },
              ]}
              placeholder="Please enter email"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Phone "
              name="phone"
              rules={[
                {
                  pattern: regexData.phone,
                  message: 'Enter valid phone !',
                },
              ]}
              placeholder="eg. 9XXXXXXXXX"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Address"
              name="address"
              rules={proFormUserFieldValidation.address}
              placeholder="Please enter Address"
            />
          </Col>
        </Row>
      </>
    </ModalForm>
  );
};

export default GuestModal;
