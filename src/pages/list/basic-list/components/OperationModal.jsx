import {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import styles from '../style.less';
import { Button, Result } from 'antd';

const OperationModal = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;

  if (!visible) {
    return null;
  }

  return (
    <ModalForm
      visible={visible}
      title={done ? null : `Task ${current ? 'Edit' : 'Add'}`}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done
          ? {
              padding: '72px 0',
            }
          : {},
      }}
    >
      {!done ? (
        <>
          <ProFormText
            name="title"
            label="Task Name"
            rules={[
              {
                required: true,
                message: 'Please enter the task name',
              },
            ]}
            placeholder="Please enter"
          />
          <ProFormDateTimePicker
            name="createdAt"
            label="Start Time"
            rules={[
              {
                required: true,
                message: 'Please select the start time',
              },
            ]}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            placeholder="Please select"
          />
          <ProFormSelect
            name="owner"
            label="Task Owner"
            rules={[
              {
                required: true,
                message: 'Please select the task owner',
              },
            ]}
            options={[
              {
                label: 'Fu Xiaoxiao',
                value: 'xiao',
              },
              {
                label: 'Zhou Maomao',
                value: 'mao',
              },
            ]}
            placeholder="Please select an administrator"
          />
          <ProFormTextArea
            name="subDescription"
            label="Product Description"
            rules={[
              {
                message: 'Please enter a product description of at least five characters!',
                min: 5,
              },
            ]}
            placeholder="Please enter at least five characters"
          />
        </>
      ) : (
        <Result
          status="success"
          title="Operation Successful"
          subTitle="A series of information descriptions, very short and can also be punctuated."
          extra={
            <Button type="primary" onClick={onDone}>
              Got it
            </Button>
          }
          className={styles.formResult}
        />
      )}
    </ModalForm>
  );
};

export default OperationModal;
