import React, { Fragment, useState } from 'react';
import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
} from 'antd';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import classNames from 'classnames';
import { useRequest } from 'umi';
import { queryAdvancedProfile } from './service';
import styles from './style.less';

const { Step } = Steps;
const ButtonGroup = Button.Group;
const menu = (
  <Menu>
    <Menu.Item key="1">Option 1</Menu.Item>
    <Menu.Item key="2">Option 2</Menu.Item>
    <Menu.Item key="3">Option 3</Menu.Item>
  </Menu>
);
const mobileMenu = (
  <Menu>
    <Menu.Item key="1">Operation 1</Menu.Item>
    <Menu.Item key="2">Operation 2</Menu.Item>
    <Menu.Item key="3">Option 1</Menu.Item>
    <Menu.Item key="4">Option 2</Menu.Item>
    <Menu.Item key="">Option 3</Menu.Item>
  </Menu>
);
const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            overlay={mobileMenu}
            placement="bottomRight"
          >
            Main Action
          </Dropdown.Button>
        );
      }

      return (
        <Fragment>
          <ButtonGroup>
            <Button>Action 1</Button>
            <Button>Action 2</Button>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          </ButtonGroup>
          <Button type="primary">Main Action</Button>
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);
const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="Status" value="Pending Approval" />
    <Statistic title="Order Amount" value={568.08} prefix="¥" />
  </div>
);
const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="Creator">Qu Lili</Descriptions.Item>
        <Descriptions.Item label="Ordered Product">XX Service</Descriptions.Item>
        <Descriptions.Item label="Creation Time">2017-07-07</Descriptions.Item>
        <Descriptions.Item label="Related Documents">
          <a href="">12421</a>
        </Descriptions.Item>
        <Descriptions.Item label="Effective Date">2017-07-07 ~ 2017-08-08</Descriptions.Item>
        <Descriptions.Item label="Remarks">
          Please confirm within two working days
        </Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);
const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      Qu Lili
      <DingdingOutlined
        style={{
          marginLeft: 8,
        }}
      />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);
const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      Zhou Mao Mao
      <DingdingOutlined
        style={{
          color: '#00A0E9',
          marginLeft: 8,
        }}
      />
    </Fragment>
    <div>
      <a href="">Remind</a>
    </div>
  </div>
);
const popoverContent = (
  <div
    style={{
      width: 160,
    }}
  >
    Wu Jia Hao
    <span
      className={styles.textSecondary}
      style={{
        float: 'right',
      }}
    >
      <Badge
        status="default"
        text={
          <span
            style={{
              color: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            No response
          </span>
        }
      />
    </span>
    <div
      className={styles.textSecondary}
      style={{
        marginTop: 4,
      }}
    >
      Duration: 2 hours 25 minutes
    </div>
  </div>
);

const customDot = (dot, { status }) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        <span>{dot}</span>
      </Popover>
    );
  }

  return dot;
};

const operationTabList = [
  {
    key: 'tab1',
    tab: 'Operation Log 1',
  },
  {
    key: 'tab2',
    tab: 'Operation Log 2',
  },
  {
    key: 'tab3',
    tab: 'Operation Log 3',
  },
];
const columns = [
  {
    title: 'Operation Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Operator',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Execution Result',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      if (text === 'agree') {
        return <Badge status="success" text="Success" />;
      }

      return <Badge status="error" text="Reject" />;
    },
  },
  {
    title: 'Operation Time',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Remarks',
    dataIndex: 'memo',
    key: 'memo',
  },
];

const Advanced = () => {
  const [tabStatus, setTabStatus] = useState({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });
  const { data = {}, loading } = useRequest(queryAdvancedProfile);
  const { advancedOperation1, advancedOperation2, advancedOperation3 } = data;
  const contentList = {
    tab1: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation1}
        columns={columns}
      />
    ),
    tab2: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation2}
        columns={columns}
      />
    ),
    tab3: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation3}
        columns={columns}
      />
    ),
  };

  const onTabChange = (tabActiveKey) => {
    setTabStatus({ ...tabStatus, tabActiveKey });
  };

  const onOperationTabChange = (key) => {
    setTabStatus({ ...tabStatus, operationKey: key });
  };

  return (
    <PageContainer
      title="Order Number: 234231029431"
      extra={action}
      className={styles.pageHeader}
      content={description}
      extraContent={extra}
      tabActiveKey={tabStatus.tabActiveKey}
      onTabChange={onTabChange}
      tabList={[
        {
          key: 'detail',
          tab: 'Details',
        },
        {
          key: 'rule',
          tab: 'Rules',
        },
      ]}
    >
      <div className={styles.main}>
        <GridContent>
          <Card
            title="Process Progress"
            style={{
              marginBottom: 24,
            }}
          >
            <RouteContext.Consumer>
              {({ isMobile }) => (
                <Steps
                  direction={isMobile ? 'vertical' : 'horizontal'}
                  progressDot={customDot}
                  current={1}
                >
                  <Step title="Create Project" description={desc1} />
                  <Step title="Department Initial Review" description={desc2} />
                  <Step title="Financial Review" />
                  <Step title="Complete" />
                </Steps>
              )}
            </RouteContext.Consumer>
          </Card>
          <Card
            title="User Information"
            style={{
              marginBottom: 24,
            }}
            bordered={false}
          >
            <Descriptions
              style={{
                marginBottom: 24,
              }}
            >
              <Descriptions.Item label="User Name">Fu Xiao Xiao</Descriptions.Item>
              <Descriptions.Item label="Membership Card Number">
                32943898021309809423
              </Descriptions.Item>
              <Descriptions.Item label="ID Card">3321944288191034921</Descriptions.Item>
              <Descriptions.Item label="Contact Number">18112345678</Descriptions.Item>
              <Descriptions.Item label="Contact Address">
                Qu Lili 18100000000 Intersection of Huanggushan Road and Gongzhu Road, Xihu
                District, Hangzhou City, Zhejiang Province
              </Descriptions.Item>
            </Descriptions>
            <Descriptions
              style={{
                marginBottom: 24,
              }}
              title="Info Group"
            >
              <Descriptions.Item label="Some Data">725</Descriptions.Item>
              <Descriptions.Item label="Data Update Time">2017-08-08</Descriptions.Item>
              <Descriptions.Item
                label={
                  <span>
                    Some Data
                    <Tooltip title="Data Explanation">
                      <InfoCircleOutlined
                        style={{
                          color: 'rgba(0, 0, 0, 0.43)',
                          marginLeft: 4,
                        }}
                      />
                    </Tooltip>
                  </span>
                }
              >
                725
              </Descriptions.Item>
              <Descriptions.Item label="Data Update Time">2017-08-08</Descriptions.Item>
            </Descriptions>
            <h4
              style={{
                marginBottom: 16,
              }}
            >
              Info Group
            </h4>
            <Card type="inner" title="Multi-level Info Group">
              <Descriptions
                style={{
                  marginBottom: 16,
                }}
                title="Group Name"
              >
                <Descriptions.Item label="Responsible Person">Lin Dong Dong</Descriptions.Item>
                <Descriptions.Item label="Role Code">1234567</Descriptions.Item>
                <Descriptions.Item label="Department">XX Company - YY Department</Descriptions.Item>
                <Descriptions.Item label="Expiration Time">2017-08-08</Descriptions.Item>
                <Descriptions.Item label="Description">
                  This description is very long...
                </Descriptions.Item>
              </Descriptions>
              <Divider
                style={{
                  margin: '16px 0',
                }}
              />
              <Descriptions
                style={{
                  marginBottom: 16,
                }}
                title="Group Name"
                column={1}
              >
                <Descriptions.Item label="Scientific Name">
                  Citrullus lanatus (Thunb.) Matsum. et Nakai Annual herbaceous trailing vine; Stem
                  and branches are stout, with obvious edges. The tendrils are relatively thick.
                </Descriptions.Item>
              </Descriptions>
              <Divider
                style={{
                  margin: '16px 0',
                }}
              />
              <Descriptions title="Group Name">
                <Descriptions.Item label="Responsible Person">Fu Xiao Xiao</Descriptions.Item>
                <Descriptions.Item label="Role Code">1234568</Descriptions.Item>
              </Descriptions>
            </Card>
          </Card>
          <Card
            title="User Call Records in the Last Six Months"
            style={{
              marginBottom: 24,
            }}
            bordered={false}
          >
            <Empty />
          </Card>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            onTabChange={onOperationTabChange}
          >
            {contentList[tabStatus.operationKey]}
          </Card>
        </GridContent>
      </div>
    </PageContainer>
  );
};

export default Advanced;
