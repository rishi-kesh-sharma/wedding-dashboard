import { List, Switch } from 'antd';
import React, { Fragment } from 'react';

const NotificationView = () => {
  // Function to get notification data
  const getData = () => {
    const Action = <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />;
    return [
      {
        title: 'Account Password',
        description: 'Messages from other users will be notified via in-site messages.',
        actions: [Action],
      },
      {
        title: 'System Messages',
        description: 'System messages will be notified via in-site messages.',
        actions: [Action],
      },
      {
        title: 'To-Do Tasks',
        description: 'To-do tasks will be notified via in-site messages.',
        actions: [Action],
      },
    ];
  };

  const data = getData();

  // Render the component
  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default NotificationView;
