import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Pagination,
  Form,
  Row,
  Col,
  Input,
  Modal,
  Switch,
  Popconfirm,
} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history, useAccess } from 'umi';
import { count, search, remove, getCategory, sellProperty } from '../service';
import { property } from 'lodash';
import SellModal from '@/components/sell';
import CustomPagination from '@/components/CustomPagination';
import usePagination from '@/hooks/usePagination';
const TableList = () => {
  const actionRef = useRef();
  const access = useAccess();
  const [data, setData] = useState({ data: [] });
  const [total, setTotal] = useState(0);
  const [searchObject, setSearchObject] = useState({});
  const [sort, setSort] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState();
  const [id, setId] = useState();

  const [fetchResources, setFetchResources] = useState(false);
  const { confirm } = Modal;

  //  custom pagination hook
  const { current, pageSize, setPageSize, setCurrent } = usePagination({ total, searchObject });
  const fetchResourceData = async () => {
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
      // message.error(ex.data.errorMessage);
      message.error('Something went wrong');
      return false;
    }
  };

  const showDeleteConfirm = (item) => {
    confirm({
      title: `Do you Want to delete ${item.name}?`,
      icon: <ExclamationCircleOutlined />,
      content: `${item.name} will be deleted permanently.`,
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

  const fetchResourceCount = async () => {
    const result = await count({ ...searchObject });
    setTotal(result.total);
  };

  useEffect(() => {
    if (fetchResources) {
      fetchResourceData();
    }
  }, [fetchResources]);

  useEffect(() => {
    fetchResourceCount();
    setFetchResources(true);
  }, [searchObject]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setCurrent(1);
    setSearchObject(values);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'property',
      render: (property) => property.name,
      sorter: true,
    },
    {
      title: 'Property purpose',
      dataIndex: 'property',
      render: (property) => property.purpose,
    },
    {
      title: 'Price(Rs.)',
      dataIndex: 'property',
      render: (property) => property.price,
      sorter: true,
    },

    {
      title: 'Buyer name',
      dataIndex: 'user',
      render: (user) => user.firstName + ' ' + user.lastName,
    },
    {
      title: 'Buyer email',
      dataIndex: 'user',
      render: (user) => user.email,
    },
    // {
    //   title: 'Buyer address',
    //   dataIndex: 'user',
    //   render: (user) => user.address,
    // },
    {
      title: 'Buyer Phone Number',
      dataIndex: 'user',
      render: (user) => user.phoneNumber,
    },
    // {
    //   title: 'Updated At',
    //   dataIndex: 'updatedAt',
    //   valueType: 'dateTime',
    //   sorter: true,
    // },
    {
      title: 'Status',
      dataIndex: 'property',
      render: (property, record) => {
        return (
          <>
            <Switch
              checkedChildren="sold"
              unCheckedChildren="unsold"
              checked={property?.isSold}
              disabled={property?.isSold}
            />
          </>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <DeleteButton key="delete" record={record} elementId="category-list-delete-btn" />,

        <Button
          type="primary"
          disabled={record?.property?.isSold}
          onClick={() => {
            console.log(record?.property?._id);
            showModal(record?.property?._id);
          }}
        >
          Sell
        </Button>,
      ],
    },
  ];

  const DeleteButton = (props) => {
    const { elementId } = props;

    const showDeleteConfirm = (user) => {
      confirm({
        title: `Do you Want to delete this category?`,
        icon: <ExclamationCircleOutlined />,
        content: `Category will be deleted permanently.`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          console.log('OK');
          const r = await remove(user._id);
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
          style={{ display: 'flex', gap: '6px' }}
          key="config"
          onClick={() => {
            showDeleteConfirm(props.record);
          }}
        >
          {/* Delete */}
          {/* <DeleteOutlined style={{ textAlign: 'center' }} /> */}
          <Button
            type="danger"
            // disabled={record?.property?.isSold}
            // onClick={() => {
            //   console.log(record?.property?._id);
            //   showModal(record?.property?._id);
            // }}
          >
            Delete
          </Button>
          ,
        </a>
      );
    }
    return null;
  };
  const showModal = (pid) => {
    setIsModalOpen(true);
    setId(pid);
  };
  const handleOk = async () => {
    try {
      await sellProperty({ soldedAt: price, isSold: true, _id: id });
      setIsModalOpen(false);
      setFetchResources(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <PageContainer pageHeaderRender={false}>
        <SellModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          price={price}
          setPrice={setPrice}
          data={data.data}
        />
        {/* <Form
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
        </Form> */}
        <ProTable
          defaultSize="small"
          headerTitle="Purchases"
          actionRef={actionRef}
          rowKey="_id"
          search={false}
          options={{ reload: false }}
          onChange={(_, _filter, _sorter) => {
            console.log('_sorter', _sorter);
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
        ></ProTable>
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
