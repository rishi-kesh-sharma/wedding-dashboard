import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message, Tabs, Button } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from './service';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState({});
  const [type, setType] = useState('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  const { auth, setAuthentication } = useModel('getAuthState');
  const setUserInfo = async (msg) => {
    if (msg) {
      await setInitialState((oldInitialState) => {
        const data = {
          userInfo: msg,
          token: msg.token,
          isAuthenticated: true,
        };
        setAuthentication(data);
        initialState?.initialize?.(data);
        return {
          ...oldInitialState,
          currentUser: msg,
          data: { value: new Date().toDateString(), key: 'X' },
        };
      });
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);

    try {
      // Log in
      const { data: msg } = await login({ ...values, type });
      if (msg instanceof Error) {
        message.error(msg.message);
      } else {
        await setUserInfo(msg);
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        setUserLoginState(msg);
        console.log(msg, 'data');
        if (msg.role == 'admin') {
          return history.push(redirect || '/event/list');
        }

        if (msg.role == 'agency') {
          return history.push(redirect || `/event/guest/${localStorage.getItem('eventId')}`);
        }
        return history;
      }
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.accountLogin.errorMessage',
        defaultMessage: 'invalid email or password！',
      });
      message.error(defaultLoginFailureMessage);
    }
    setSubmitting(false);
  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <span className={styles.title}>Wedding</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
            })}
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
              email: '',
              password: '',
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: 'Log in',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(values);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: 'Account password login',
                })}
              />
            </Tabs>

            {type === 'account' && (
              <>
                <ProFormText
                  name="email"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.email.placeholder',
                    defaultMessage: 'email: admin ',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.email.required"
                          defaultMessage="please enter  email!                          "
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: 'Password: superadmin123',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="Please enter password！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}
            {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox>
              <Link
                to="/forgotpassword"
                style={{
                  float: 'right',
                }}
              >
                <FormattedMessage
                  id="pages.login.forgotPassword"
                  defaultMessage="forget the password"
                />
              </Link>
            </div>
          </ProForm>

          <div
            style={{
              marginTop: 24,
            }}
          >
            {/* <Button block type="default">
              <Link to="/register">
                <FormattedMessage id="pages.login.register" defaultMessage="Register" />
              </Link>
            </Button> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
