import { Button, Result } from 'antd';
import { Link } from 'umi';
import React from 'react';
import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        <span>View Email</span>
      </Button>
    </a>
    <Link to="/">
      <Button size="large">Back to Homepage</Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => {
  const email = location.state ? location.state.account : 'AntDesign@example.com';
  return (
    <Result
      className={styles.registerResult}
      status="success"
      title={
        <div className={styles.title}>
          <span>Your account: {email} has been successfully registered</span>
        </div>
      }
      subTitle="The activation email has been sent to your inbox and is valid for 24 hours. Please log in to your email promptly and click on the link in the email to activate your account."
      extra={actions}
    />
  );
};

export default RegisterResult;
