import { Card, message } from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';

const BasicForm = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('Submission successful');
    },
  });

  const onFinish = async (values) => {
    run(values);
  };

  return (
    <PageContainer content="The form page is used to collect or verify information from users. Basic forms are common in scenarios with fewer data items.">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
        >
          <ProFormText
            width="lg"
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter the title',
              },
            ]}
            placeholder="Give the target a name"
          />
          <ProFormDateRangePicker
            label="Start and End Dates"
            width="lg"
            name="date"
            rules={[
              {
                required: true,
                message: 'Please select start and end dates',
              },
            ]}
            placeholder={['Start date', 'End date']}
          />
          <ProFormTextArea
            label="Goal Description"
            width="xl"
            name="goal"
            rules={[
              {
                required: true,
                message: 'Please enter the goal description',
              },
            ]}
            placeholder="Enter your phased work goal"
          />

          <ProFormTextArea
            label="Measurement Standard"
            name="standard"
            width="xl"
            rules={[
              {
                required: true,
                message: 'Please enter the measurement standard',
              },
            ]}
            placeholder="Enter the measurement standard"
          />

          <ProFormText
            width="lg"
            label={
              <span>
                Client
                <em className={styles.optional}>(Optional)</em>
              </span>
            }
            tooltip="The service object of the goal"
            name="client"
            placeholder="Describe the clients you serve, mention internal clients directly with @name/employee ID"
          />

          <ProFormText
            width="lg"
            label={
              <span>
                Invited Reviewers
                <em className={styles.optional}>(Optional)</em>
              </span>
            }
            name="invites"
            placeholder="Directly @name/employee ID, up to 5 people can be invited"
          />

          <ProFormDigit
            label={
              <span>
                Weight
                <em className={styles.optional}>(Optional)</em>
              </span>
            }
            name="weight"
            placeholder="Enter"
            min={0}
            max={100}
            width="xs"
            fieldProps={{
              formatter: (value) => `${value || 0}%`,
              parser: (value) => (value ? value.replace('%', '') : '0'),
            }}
          />

          <ProFormRadio.Group
            options={[
              {
                value: '1',
                label: 'Public',
              },
              {
                value: '2',
                label: 'Partially Public',
              },
              {
                value: '3',
                label: 'Private',
              },
            ]}
            label="Goal Visibility"
            help="Clients and invited reviewers are automatically shared by default"
            name="publicType"
          />
          <ProFormDependency name={['publicType']}>
            {({ publicType }) => {
              return (
                <ProFormSelect
                  width="lg"
                  name="publicUsers"
                  fieldProps={{
                    style: {
                      margin: '8px 0',
                      display: publicType && publicType === '2' ? 'block' : 'none',
                    },
                  }}
                  options={[
                    {
                      value: '1',
                      label: 'Colleague A',
                    },
                    {
                      value: '2',
                      label: 'Colleague B',
                    },
                    {
                      value: '3',
                      label: 'Colleague C',
                    },
                  ]}
                />
              );
            }}
          </ProFormDependency>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default BasicForm;
