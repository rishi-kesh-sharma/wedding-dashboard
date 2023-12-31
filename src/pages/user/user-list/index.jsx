import { PlusOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Pagination, Form, Row, Col, Input, DatePicker, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history, useAccess } from 'umi';
import { count, search, remove } from '../service';
import usePagination from '@/hooks/usePagination';
import CustomPagination from '@/components/CustomPagination';
const TableList = () => {
  const actionRef = useRef();
  const access = useAccess();
  const [data, setData] = useState({ data: [] });
  const [total, setTotal] = useState(0);
  const [searchObject, setSearchObject] = useState({});
  const [sort, setSort] = useState({});
  const [fetchResources, setFetchResources] = useState(false);
  const { confirm } = Modal;

  //  custom pagination hook
  const { current, pageSize, setPageSize, setCurrent } = usePagination({ total, searchObject });
  const fetchResourcesData = async () => {
    const hide = message.loading('Loading...');
    try {
      const result = await search({
        current: current,
        pageSize,
        ...searchObject,
        ...sort,
      });
      hide();
      setData(result);
      setFetchResources(false);
      return result;
    } catch (error) {
      hide();
      const str = JSON.stringify(error);
      const ex = JSON.parse(str);
      console.log(ex);
      message.error('Something went wrong');

      return false;
    }
  };

  const fetchResourceCount = async () => {
    const result = await count({ ...searchObject });
    setTotal(result.total);
  };
  useEffect(() => {
    if (fetchResources) {
      fetchResourcesData();
    }
  }, [fetchResources]);

  useEffect(() => {
    setSort(null);
    setFetchResources(true);
    fetchResourceCount();
  }, [searchObject]);

  useEffect(() => {
    console.log('checking ', 'user-list-delete-btn');
    if (access.canShow('user-list-delete-btn')) {
      console.log('show delete button');
    }
  }, []);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setCurrent(1);
    setSearchObject(values);
  };

  const columns = [
    {
      title: ' Name',
      sorter: true,
      tip: 'firstName',
      dataIndex: 'firstName',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              history.push(`/users/edit/${entity._id}`);
            }}
          >
            {`${entity.firstName} ${entity.lastName}`}
          </a>
        );
      },
    },
    {
      title: 'Role',
      dataIndex: 'roleAlias',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <DeleteButton key="delete" record={record} elementId="user-list-delete-btn" />,
      ],
    },
  ];

  const DeleteButton = (props) => {
    const { elementId } = props;

    const showDeleteConfirm = (item) => {
      confirm({
        title: `Do you Want to delete ${item.firstName} ${item.lastName}?`,
        icon: <ExclamationCircleOutlined />,
        content: `${item.firstName} ${item.lastName} will be deleted permanently.`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          console.log('OK');
          const r = await remove(item._id);
          if (r.success) {
            message.success(r.message);
            setFetchResources(true);
          }
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };

    const isVisible = access.canShow(elementId);
    if (isVisible) {
      const isDisabled = access.isDisabled(elementId);
      return isDisabled ? (
        <span>Delete</span>
      ) : (
        <a
          style={{ color: 'red', display: 'flex', gap: '6px' }}
          key="config"
          onClick={() => {
            showDeleteConfirm(props.record);
          }}
        >
          {/* Delete */}
          <DeleteOutlined style={{ textAlign: 'center' }} />
          Delete
        </a>
      );
    }
    return null;
  };
  return (
    <>
      <PageContainer pageHeaderRender={false}>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
          style={{
            background: 'white',
            padding: '24px 0 0 24px',
          }}
        >
          <Row gutter={2}>
            <Col flex={1} key={'name'}>
              <Form.Item style={{ marginBottom: 0 }} name={`name`}>
                <Input size="" placeholder="Search keyword for name or alias" width={'500px'} />
              </Form.Item>
            </Col>
            <Col flex={6}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button
                style={{ margin: '0 2px' }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
        <ProTable
          defaultSize="small"
          headerTitle="Users"
          actionRef={actionRef}
          rowKey="_id"
          search={false}
          options={{ reload: false }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                history.push('/users/new');
              }}
            >
              <PlusOutlined /> New
            </Button>,
          ]}
          onChange={(_, _filter, _sorter) => {
            let sort = {};
            sort['sort'] = _sorter.field;
            sort['order'] = _sorter.order === 'ascend' ? 1 : -1;
            setSort(sort);
            setCurrent(1);
            setFetchResources(true);
          }}
          dataSource={data.data}
          columns={columns}
          rowSelection={false}
          pagination={false}
        />
        <CustomPagination
          total={total}
          setFetchResources={setFetchResources}
          setPageSize={setPageSize}
          setCurrent={setCurrent}
          current={current}
        />
      </PageContainer>
    </>
  );
};

export default TableList;
