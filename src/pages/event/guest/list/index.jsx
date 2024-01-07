import {
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Button, message, Form, Modal, Dropdown, Space, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { useAccess } from 'umi';
import { remove, sendEmail } from '../service';

import GuestModal from '../../detail/modals/GuestModal';
import { saveGuestInBulk } from '../../service';
import ExcelToJsonConverter from '../../entry/forms/GuestInfoForm/ExcelToJson';
import TravelDetailModalForm from '../TravelDetailModalForm';
import RoomDetailModalForm from './RoomDetailModal';
const TableList = ({ data, setFetchResource }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [travelModalVisible, setTravelModalVisible] = useState(false);
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [currentTravelDetail, setCurrentTravelDetail] = useState({});
  const [currentRoomDetail, setCurrentRoomDetail] = useState({});
  const actionRef = useRef();
  const access = useAccess();
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

  const checkStatus = {
    travelStatus: ['pending', 'travel-detail-asked'],
    eventStatus: ['pending', 'cancelled'],
  };
  const getContentToRender = (record) => {
    const temp1 = checkStatus?.travelStatus.some((item) => {
      return record?.travelStatus == item;
    });
    if (temp1) {
      return null;
    }
    const temp2 = checkStatus.eventStatus.some((item) => {
      return record?.eventStatus == item;
    });

    if (temp2) {
      return null;
    }
    return <AssignRoom record={record} />;
  };
  const columns = [
    {
      // filters: true,
      title: ' Name',
      // sorter: true,
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
      // filters: true,
      title: 'Email',
      dataIndex: 'email',
    },
    // {
    //   title: 'Phone',
    //   dataIndex: 'phone',
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    // },
    {
      title: 'Event Status',
      search: false,
      dataIndex: 'eventStatus',
      render: (_, record) => (
        <Tag color="orange" key={'event-status'}>
          {record?.eventStatus}
        </Tag>
      ),
    },
    {
      title: 'Travel Status',
      search: false,
      dataIndex: 'travelStatus',
      render: (_, record) => (
        <Tag color="cyan" key={'event-status'}>
          {record?.travelStatus}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      search: false,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <DeleteButton key="delete" record={record} elementId="guest-list-delete-btn" />,
        <TravelDetail
          key="update-travel-details"
          record={record}
          elementId="update-travel-details"
        />,
        getContentToRender(record),
      ],
    },
  ];

  const handleTravelDetailModal = (record) => {
    setTravelModalVisible(true);
    setCurrentTravelDetail(record?.travelDetail);
  };
  const handleAssignRoomModal = (record) => {
    setRoomModalVisible(true);
    setCurrentRoomDetail(record);
  };

  const TravelDetail = ({ record }) => {
    return (
      <Button onClick={() => handleTravelDetailModal(record)} type="primary">
        Travel Detail
      </Button>
    );
  };

  const AssignRoom = ({ record }) => {
    if (record?.travelStatus == 'roomAssigned' || record?.travelStatus == 'days-information') {
      return (
        <Button onClick={() => handleAssignRoomModal(record)} type="primary">
          Update Room
        </Button>
      );
    } else {
      return (
        <Button onClick={() => handleAssignRoomModal(record)} type="primary">
          Assign Room
        </Button>
      );
    }
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
      if (response.success == false) {
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
          // search={

          // }
          // search={true}
          // filters={true}
          search={false}
          defaultSize="small"
          headerTitle="Guests"
          actionRef={actionRef}
          // request={(params, sort, filter) => {
          //   console.log(params, sort, filter);

          //   const filterKeys = Object.keys(filter);
          //   const filteredValues = data?.guests?.filter((row, index) => {
          //     return filterKeys.some((key) => {
          //       // console.log(params[key], 'from params');
          //       // console.log(row[key], 'from row');
          //       if (params[key] && row[key]) {
          //         console.log(params[key] && row[key], 'bool');
          //         console.log('hello');
          //         console.log(params[key], 'from params');
          //         console.log(row[key], 'from row');
          //         return toString(row[key]).toLowerCase().includes(params[key].toLowerCase());
          //       }
          //     });
          //   });
          //   console.log(filteredValues, 'filter');
          //   return filteredValues;
          // }}
          rowKey="_id"
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
          pagination={{
            pageSize: 10,
          }}
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
        <RoomDetailModalForm
          setFetchResource={setFetchResource}
          visible={roomModalVisible}
          setVisible={setRoomModalVisible}
          current={currentRoomDetail}
          eventId={eventId}
        />
      </PageContainer>
    </>
  );
};

export default TableList;
