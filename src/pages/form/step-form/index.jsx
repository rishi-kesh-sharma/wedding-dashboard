import React, { useRef, useState } from 'react';
import { Card, Result, Button, Descriptions, Divider, Alert, Statistic } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormDigit, ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-form';
import styles from './style.less';

const StepDescriptions = ({ stepData, bordered }) => {
  const { payAccount, receiverAccount, receiverName, amount } = stepData;
  return (
    <Descriptions column={1} bordered={bordered}>
      <Descriptions.Item label="Payer's Account">{payAccount}</Descriptions.Item>
      <Descriptions.Item label="Payee's Account">{receiverAccount}</Descriptions.Item>
      <Descriptions.Item label="Payee's Name">{receiverName}</Descriptions.Item>
      <Descriptions.Item label="Transfer Amount">
        <Statistic
          value={amount}
          suffix={
            <span
              style={{
                fontSize: 14,
              }}
            >
              CNY
            </span>
          }
          precision={2}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

const StepResult = (props) => {
  return (
    <Result
      status="success"
      title="Operation Successful"
      subTitle="Expected to be credited within two hours"
      extra={
        <>
          <Button type="primary" onClick={props.onFinish}>
            Transfer Again
          </Button>
          <Button>View Statement</Button>
        </>
      }
      className={styles.result}
    >
      {props.children}
    </Result>
  );
};

const StepForm = () => {
  const [stepData, setStepData] = useState({
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
    receiverMode: 'alipay',
  });
  const [current, setCurrent] = useState(0);
  const formRef = useRef();
  return (
    <PageContainer content="Divide a lengthy or unfamiliar form task into multiple steps to guide the user through completion.">
      <Card bordered={false}>
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm
            formRef={formRef}
            title="Fill in Transfer Information"
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <ProFormSelect
              label="Payer's Account"
              width="lg"
              name="payAccount"
              rules={[
                {
                  required: true,
                  message: "Please select payer's account",
                },
              ]}
              valueEnum={{
                'ant-design@alipay.com': 'ant-design@alipay.com',
              }}
            />

            <ProForm.Group title="Payee's Account" size={8}>
              <ProFormSelect
                name="receiverMode"
                rules={[
                  {
                    required: true,
                    message: "Please select payee's account",
                  },
                ]}
                valueEnum={{
                  alipay: 'Alipay',
                  bank: 'Bank Account',
                }}
              />
              <ProFormText
                name="receiverAccount"
                rules={[
                  {
                    required: true,
                    message: "Please enter the payee's account",
                  },
                  {
                    type: 'email',
                    message: 'The account name should be in email format',
                  },
                ]}
                placeholder="test@example.com"
              />
            </ProForm.Group>
            <ProFormText
              label="Payee's Name"
              width="lg"
              name="receiverName"
              rules={[
                {
                  required: true,
                  message: "Please enter the payee's name",
                },
              ]}
              placeholder="Please enter the payee's name"
            />
            <ProFormDigit
              label="Transfer Amount"
              name="amount"
              width="lg"
              rules={[
                {
                  required: true,
                  message: 'Please enter the transfer amount',
                },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: 'Please enter a valid numeric amount',
                },
              ]}
              placeholder="Please enter the amount"
              fieldProps={{
                prefix: '￥',
              }}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="Confirm Transfer Information">
            <div className={styles.result}>
              <Alert
                closable
                showIcon
                message="After confirming the transfer, the funds will be directly credited to the payee's account and cannot be refunded."
                style={{
                  marginBottom: 24,
                }}
              />
              <StepDescriptions stepData={stepData} bordered />
              <Divider
                style={{
                  margin: '24px 0',
                }}
              />
              <ProFormText.Password
                label="Payment Password"
                width="lg"
                name="password"
                required={false}
                rules={[
                  {
                    required: true,
                    message: 'A payment password is required to complete the payment',
                  },
                ]}
              />
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="Completion">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                formRef.current?.resetFields();
              }}
            >
              <StepDescriptions stepData={stepData} />
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
        <Divider
          style={{
            margin: '40px 0 24px',
          }}
        />
        <div className={styles.desc}>
          <h3>Instructions</h3>
          <h4>Transfer to Alipay Account</h4>
          <p>
            If necessary, common questions about the product can be placed here. If necessary,
            common questions about the product can be placed here. If necessary, common questions
            about the product can be placed here.
          </p>
          <h4>Transfer to Bank Account</h4>
          <p>
            If necessary, common questions about the product can be placed here. If necessary,
            common questions about the product can be placed here. If necessary, common questions
            about the product can be placed here.
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default StepForm;
