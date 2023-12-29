import {
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  MailOutlined,
} from '@ant-design/icons';
import {
  Button,
  message,
  Pagination,
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  Modal,
  Dropdown,
  Space,
} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history, useAccess } from 'umi';
import { count, search, remove, sendEmail } from '../service';
import usePagination from '@/hooks/usePagination';
import CustomPagination from '@/components/CustomPagination';
import GuestModal from '../../detail/modals/GuestModal';
import { saveGuestInBulk } from '../../service';
import ExcelToJsonConverter from '../../entry/forms/GuestInfoForm/ExcelToJson';
import TravelDetailModalForm from '../TravelDetailModalForm';
const TableList = ({ data, setFetchResource }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [travelModalVisible, setTravelModalVisible] = useState(false);
  const [currentTravelDetail, setCurrentTravelDetail] = useState({});

  const actionRef = useRef();
  const access = useAccess();
  const [total, setTotal] = useState(data?.guests?.length);
  const [searchObject, setSearchObject] = useState({});
  const [sort, setSort] = useState({});
  const eventId = data?._id;
  const [current, setCurrent] = useState(null);
  const { confirm } = Modal;
  const handleAdd = () => {
    setCurrent(null);
    setModalVisible(true);
  };
  const handleEdit = (item) => {
    setCurrent(item);
    setModalVisible(true);
  };

  const [form] = Form.useForm();

  const handleSaveInBulk = async (values) => {
    console.log(values, 'json data');
    const result = await saveGuestInBulk(eventId, JSON.parse(values));
    setFetchResource(true);
    if (
      result instanceof Error ||
      result.error ||
      result.status == 'error' ||
      result.success == false
    ) {
      message.error(result.error || result.message);
    } else {
      message.success(result.message || 'Guest Information is saved in Bulk');
    }
  };

  const columns = [
    {
      title: ' Name',
      sorter: true,
      tip: 'name',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              handleEdit(entity);
            }}
          >
            {`${entity.name}`}
          </a>
        );
      },
    },

    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <TravelDetail
          key="update-travel-details"
          record={record}
          elementId="guest-list-delete-btn"
        />,
        <DeleteButton key="delete" record={record} elementId="guest-list-delete-btn" />,
      ],
    },
  ];

  const handleTravelDetailModal = (record) => {
    setTravelModalVisible(true);
    setCurrentTravelDetail(record?.travelDetail);
  };

  const TravelDetail = ({ record }) => {
    return (
      <Button onClick={() => handleTravelDetailModal(record)} type="primary">
        Travel Detail
      </Button>
    );
  };

  const DeleteButton = (props) => {
    const { elementId } = props;
    const showDeleteConfirm = (item) => {
      confirm({
        title: `Do you Want to delete ${item.name}?`,
        icon: <ExclamationCircleOutlined />,
        content: `${item.name}  will be deleted permanently.`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          console.log('OK');
          const r = await remove(item._id);
          setFetchResource(true);
          if (r.success) {
            message.success(r.message);
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

  const handleMenuClick = async (e) => {
    const purpose = e.key;
    try {
      const response = await sendEmail(eventId, { purpose: e.key });
      if (response.error) {
        return message.error(`${err.message || 'Could not send email!!'}`);
      }
      message.success(`email sent successfully!!!`);
    } catch (err) {
      message.error(`${err.message || 'Could not send email!!'}`);
    }
  };
  const items = [
    {
      label: 'Invitation',
      key: 'invitation',
      icon: <MailOutlined />,
    },
    {
      label: 'Alert Invitation',
      key: 'alert-invitation',
      icon: <MailOutlined />,
    },
    {
      label: 'Ask Travel Details',
      key: 'ask-travel-detail',
      icon: <MailOutlined />,
    },
    {
      label: 'Alert Ask Travel Detail',
      key: 'alert-ask-travel-detail',
      icon: <MailOutlined />,
    },
    // {
    //   label: 'Accommodation',
    //   key: 'accommodation',
    //   icon: <MailOutlined />,
    // },
    {
      label: 'Days Information',
      key: 'days-information',
      icon: <MailOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <PageContainer pageHeaderRender={false}>
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
          headerTitle="Guests"
          actionRef={actionRef}
          rowKey="_id"
          search={false}
          options={{ reload: true }}
          toolBarRender={() => [
            <ExcelToJsonConverter key="save-in-bulk" handleSaveInBulk={handleSaveInBulk} />,
            <Dropdown key={'send-email'} menu={menuProps}>
              <Button type="primary">
                <Space>
                  Send Email
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>,
            <Button type="primary" key="primary" onClick={handleAdd}>
              <PlusOutlined /> New
            </Button>,
          ]}
          onChange={(_, _filter, _sorter) => {
            let sort = {};
            sort['sort'] = _sorter.field;
            sort['order'] = _sorter.order === 'ascend' ? 1 : -1;
            setSort(sort);
            setCurrent(1);
            setFetchResource(true);
          }}
          dataSource={data?.guests}
          columns={columns}
          // rowSelection={true}
          pagination={true}
        />

        <GuestModal
          setFetchResource={setFetchResource}
          visible={modalVisible}
          setVisible={setModalVisible}
          eventId={eventId}
          current={current}
        />
        <TravelDetailModalForm
          setFetchResource={setFetchResource}
          visible={travelModalVisible}
          setVisible={setTravelModalVisible}
          current={currentTravelDetail}
          eventId={eventId}
        />
      </PageContainer>
    </>
  );
};

export default TableList;
