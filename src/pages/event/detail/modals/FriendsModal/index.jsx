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
import { saveFriend, updateFriend } from '@/pages/event/service';

const FriendsModal = (props) => {
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
    formData.append('name', values.name);
    formData.append('side', values.side);
    formData.append('relation', values.relation);
    formData.append('fbLink', values.fbLink);
    formData.append('instaLink', values.instaLink);
    formData.append('image', fileList?.[0]?.originFileObj);

    if (current) {
      const result = await updateFriend(current._id, formData);
      if (result instanceof Error || result.status == 'error' || result.success == false) {
        message.error(result.message);
      } else {
        message.success(result.message || 'Updated successfully !!!');
        form.resetFields();
        setFileList([]);
      }
    } else {
      const result = await saveFriend(eventId, formData);
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
              label="Friend Name"
              name="name"
              rules={proFormEventFieldValidation.friend.name}
              placeholder="Please enter friend name"
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              width="sm"
              label="Side"
              name="side"
              rules={proFormEventFieldValidation.friend.side}
              placeholder="Please enter the side friend belong to"
              options={[
                { value: 'bride', label: 'Bride' },
                {
                  value: 'groom',
                  value: 'Groom',
                },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Relation"
              name="relation"
              rules={proFormEventFieldValidation.friend.relation}
              placeholder="Please enter the relation of friend"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Facebook Link"
              name="fbLink"
              rules={proFormEventFieldValidation.friend.fbLink}
              placeholder="Please enter the facebook link "
            />
          </Col>
          <Col span={12}>
            <ProFormText
              width="sm"
              label="Instagram Link"
              name="instaLink"
              rules={proFormEventFieldValidation.friend.instaLink}
              placeholder="Please enter the instagram link "
            />
          </Col>
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

export default FriendsModal;
