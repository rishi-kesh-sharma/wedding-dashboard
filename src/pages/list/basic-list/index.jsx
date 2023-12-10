import React, { useState } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import { addFakeList, queryFakeList, removeFakeList, updateFakeList } from './service';
import styles from './style.less';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

// Info component for displaying information
const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

// ListContent component for rendering list item content
const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>Owner</span>
      <p>{owner}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>Start Time</span>
      <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <Progress
        percent={percent}
        status={status}
        strokeWidth={6}
        style={{
          width: 180,
        }}
      />
    </div>
  </div>
);

// BasicList component
export const BasicList = () => {
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const {
    data: listData,
    loading,
    mutate,
  } = useRequest(() => {
    return queryFakeList({
      count: 50,
    });
  });
  const { run: postRun } = useRequest(
    (method, params) => {
      if (method === 'remove') {
        return removeFakeList(params);
      }

      if (method === 'update') {
        return updateFakeList(params);
      }

      return addFakeList(params);
    },
    {
      manual: true,
      onSuccess: (result) => {
        mutate(result);
      },
    },
  );
  const list = listData?.list || [];
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: list.length,
  };

  // Show modal for editing an item
  const showEditModal = (item) => {
    setVisible(true);
    setCurrent(item);
  };

  // Delete item
  const deleteItem = (id) => {
    postRun('remove', {
      id,
    });
  };

  // Handle edit and delete actions
  const editAndDelete = (key, currentItem) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: 'Delete Task',
        content: 'Are you sure you want to delete this task?',
        okText: 'Confirm',
        cancelText: 'Cancel',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  // Extra content for filtering and searching
  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">All</RadioButton>
        <RadioButton value="progress">In Progress</RadioButton>
        <RadioButton value="waiting">Waiting</RadioButton>
      </RadioGroup>
      <Search
        className={styles.extraContentSearch}
        placeholder="Enter keyword"
        onSearch={() => ({})}
      />
    </div>
  );

  // MoreBtn component for additional actions on list items
  const MoreBtn = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">Edit</Menu.Item>
          <Menu.Item key="delete">Delete</Menu.Item>
        </Menu>
      }
    >
      <a>
        More <DownOutlined />
      </a>
    </Dropdown>
  );

  // Handle modal completion
  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent({});
  };

  // Handle form submission
  const handleSubmit = (values) => {
    setDone(true);
    const method = values?.id ? 'update' : 'add';
    postRun(method, values);
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="My To-Do" value="8 tasks" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="Average Processing Time This Week" value="32 minutes" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="Tasks Completed This Week" value="24 tasks" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="Basic List"
            style={{
              marginTop: 24,
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px',
            }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      Edit
                    </a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
      <Button
        type="dashed"
        onClick={() => {
          setVisible(true);
        }}
        style={{
          width: '100%',
          marginBottom: 8,
        }}
      >
        <PlusOutlined />
        Add
      </Button>
      <OperationModal
        done={done}
        visible={visible}
        current={current}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
export default BasicList;
