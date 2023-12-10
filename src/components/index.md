---
title: business components

sidemenu: false
---

> This feature is provided by[dumi](https://d.umijs.org/zh-CN/guide/advanced#umi-%E9%A1%B9%E7%9B%AE%E9%9B%86%E6%88%90%E6%A8%A1%E5%BC%8F)supply，dumi Is a 📖 This documentation tool is designed for component development scenarios, and everyone who has used it says it is good.

# business components

Here is a list of all components used in Pro. These components are not suitable as component libraries, but are really needed in business. So we have prepared this document to guide you whether you need to use this component.

## Footer footer component

This component comes with some Pro configurations, and you generally need to change its information.

```tsx
/**
 * background: '#f0f2f5'
 */
import React from 'react';
import Footer from '@/components/Footer';

export default () => <Footer />;
```

## HeaderDropdown Header drop-down list

HeaderDropdown is an encapsulation of antd Dropdown, but it adds special processing on the mobile side, and its usage is the same.

```tsx
/**
 * background: '#f0f2f5'
 */
import { Button, Menu } from 'antd';
import React from 'react';
import HeaderDropdown from '@/components/HeaderDropdown';

export default () => {
  const menuHeaderDropdown = (
    <Menu selectedKeys={[]}>
      <Menu.Item key="center">Personal center</Menu.Item>
      <Menu.Item key="settings">Personal settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">sign out</Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <Button>hover show menu</Button>
    </HeaderDropdown>
  );
};
```

## HeaderSearch 头部搜索框

An input box with completion data that supports collapsing and expanding Input

```tsx
/**
 * background: '#f0f2f5'
 */
import { Button, Menu } from 'antd';
import React from 'react';
import HeaderSearch from '@/components/HeaderSearch';

export default () => {
  return (
    <HeaderSearch
      placeholder="Site Search"
      defaultValue="umi ui"
      options={[
        { label: 'MyRAJ Pro', value: 'MyRAJ Pro' },
        {
          label: 'MyRAJ',
          value: 'MyRAJ',
        },
        {
          label: 'Pro Table',
          value: 'Pro Table',
        },
        {
          label: 'Pro Layout',
          value: 'Pro Layout',
        },
      ]}
      onSearch={(value) => {
        console.log('input', value);
      }}
    />
  );
};
```

### API

| parameter | illustrate | type | default value | | --------------- | ---------------------------------- | ---------------------------- | ------ | | value | Input box value | `string` | - | | onChange | Triggered after the value is modified | `(value?: string) => void` | - | | onSearch | Triggered after query | `(value?: string) => void` | - | | options | List of options menu | `{label,value}[]` | - | | defaultVisible | Whether the input box is displayed by default will only take effect for the first time. | `boolean` | - | | visible | Whether the input box is displayed | `boolean` | - | | onVisibleChange | Input box shows hidden callback function | `(visible: boolean) => void` | - |

## NoticeIcon Notification tools

The notification tool provides an interface that displays various notification information.

```tsx
/**
 * background: '#f0f2f5'
 */
import { message } from 'antd';
import React from 'react';
import NoticeIcon from '@/components/NoticeIcon/NoticeIcon';

export default () => {
  const list = [
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: 'You have  received 14 new weekly newsletters',
      datetime: '2017-08-09',
      type: 'notification',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: 'Qu Nini, whom you recommended, has passed the third round of interviews',
      datetime: '2017-08-08',
      type: 'notification',
    },
  ];
  return (
    <NoticeIcon
      count={10}
      onItemClick={(item) => {
        message.info(`${item.title} was clicked`);
      }}
      onClear={(title: string, key: string) => message.info('Click to clear more')}
      loading={false}
      clearText="Clear"
      viewMoreText="see more"
      onViewMore={() => message.info('Click to see more')}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="notification"
        count={2}
        list={list}
        title="notify"
        emptyText="You have viewed all notifications"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="message"
        count={2}
        list={list}
        title="information"
        emptyText="You have read all messages"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="event"
        title="待办"
        emptyText="You have completed all to-dos"
        count={2}
        list={list}
        showViewMore
      />
    </NoticeIcon>
  );
};
```

### NoticeIcon API

| parameter | illustrate | type | default value | | --- | --- | --- | --- | | count | How many unread notifications are there | `number` | - | | bell | bell diagram | `ReactNode` | - | | onClear | Click the Clear Data button | `(tabName: string, tabKey: string) => void` | - | | onItemClick | The unread message column was clicked | `(item: API.NoticeIconData, tabProps: NoticeIconTabProps) => void` | - | | onViewMore | See more button clicks | `(tabProps: NoticeIconTabProps, e: MouseEvent) => void` | - | | onTabChange | notify Tab switching | `(tabTile: string) => void;` | - | | popupVisible | Whether the notification display is displayed | `boolean` | - | | onPopupVisibleChange | Notification information shows hidden callback function | `(visible: boolean) => void` | - | | clearText | Clear button text | `string` | - | | viewMoreText | View more button text | `string` | - | | clearClose | exhibit Show clear button clear button | `boolean` | - | | emptyImage | Bottom-line display when the list is empty | `ReactNode` | - |

### NoticeIcon.Tab API

| parameter | illustrate | type | default value | | ------------ | ------------------ | ------------------------------------ | ------ | | count | How many unread notifications are there | `number` | - | | title |Notification Tab title | `ReactNode` | - | | showClear | Show clear button | `boolean` | `true` | | showViewMore | Show loading updates | `boolean` | `true` | | tabKey | Tab the only key | `string` | - | | onClick | Click event of child item | `(item: API.NoticeIconData) => void` | - | | onClear | clear button click | `()=>void` | - | | emptyText | Test when empty | `()=>void` | - | | viewMoreText | View more button text | `string` | - | | onViewMore | See more button clicks | `( e: MouseEvent) => void` | - | | list | List of notification messages | `API.NoticeIconData` | - |

### NoticeIconData

```tsx | pure
export interface NoticeIconData {
  id: string;
  key: string;
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra: any;
  status: string;
}
```

## RightContent

RightContent It is a combination of the above components, with the addition of plugins of `SelectLang` plugin.

```tsx | pure
<Space>
  <HeaderSearch
    placeholder="Site Search"
    defaultValue="umi ui"
    options={[
      { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
      {
        label: <a href="next.ant.design">MyRAJ</a>,
        value: 'MyRAJ',
      },
      {
        label: <a href="https://protable.ant.design/">Pro Table</a>,
        value: 'Pro Table',
      },
      {
        label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
        value: 'Pro Layout',
      },
    ]}
  />
  <Tooltip title="使用文档">
    <span
      className={styles.action}
      onClick={() => {
        window.location.href = 'https://pro.ant.design/docs/getting-started';
      }}
    >
      <QuestionCircleOutlined />
    </span>
  </Tooltip>
  <Avatar />
  {REACT_APP_ENV && (
    <span>
      <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
    </span>
  )}
  <SelectLang className={styles.action} />
</Space>
```
