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
  Tag,
} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history, useAccess } from 'umi';
import { markReceived, getEventById } from '../service';

// import ExcelToJsonConverter from '../../entry/forms/GuestInfoForm/ExcelToJson';
import TravelDetailModalForm from '../TravelDetailModalForm';
import GuestModal from '../GuestModal';
import RoomDetailModalForm from '../RoomDetailModal';
const TableList = (props) => {
  const actionRef = useRef();
  const access = useAccess();
  const { eventId } = props.match.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [travelModalVisible, setTravelModalVisible] = useState(false);
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [currentTravelDetail, setCurrentTravelDetail] = useState({});
  const [currentRoomDetail, setCurrentRoomDetail] = useState({});
  const [fetchResource, setFetchResource] = useState(false);
  const [resources, setResources] = useState([]);

  const [searchObject, setSearchObject] = useState({});
  const [sort, setSort] = useState({});
  const [current, setCurrent] = useState(null);
  const { confirm } = Modal;
  const checkStatus = {
    eventStatus: 'pending',
    travelStatus: ['travel-detail-asked', 'travel-detail-received'],
  };
  const fetchResourceData = async () => {
    const hide = message.loading('Loading...');
    try {
      const result = await getEventById(localStorage.getItem('eventId'), {});
      hide();
      setResources(result?.data?.guests);
      setFetchResource(false);
    } catch (error) {
      hide();
      const str = JSON.stringify(error);
      const ex = JSON.parse(str);
      message.error('Something went wrong');
      return false;
    }
  };
  useEffect(() => {
    if (history.location.pathname == '/event/guest/:eventId') {
      history.push(`/event/guest/${localStorage.getItem('eventId')}`);
    }
    if (!localStorage.getItem('auth')) {
      localStorage.setItem('eventId', eventId);
      return history.push(`/login?redirect=${props.match.url}`);
    } else {
      // if (fetchResource) {
      fetchResourceData();
      // }
    }
  }, [fetchResource, history.location]);

  const handleEdit = (item) => {
    setCurrent(item);
    setModalVisible(true);
  };

  const [form] = Form.useForm();

  const columns = [
    {
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
    // {
    //   title: 'Event Status',
    //   dataIndex: 'eventStatus',
    //   render: (_, record) => (
    //     <Tag color="orange" key={'event-status'}>
    //       {record?.eventStatus}
    //     </Tag>
    //   ),
    // },
    {
      title: 'Travel Status',
      dataIndex: 'travelStatus',
      render: (_, record) => (
        <Tag color="cyan" key={'event-status'}>
          {record?.travelStatus == 'asked-to-agent' ? 'not received' : record?.travelStatus}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <TravelDetail
          key="update-travel-details"
          record={record}
          elementId="update-travel-details"
        />,
        getContentToRender(record),
      ],
    },
  ];

  const getContentToRender = (record) => {
    const temp1 = record?.eventStatus == checkStatus.eventStatus;
    console.log(record, 'record');

    if (temp1) {
      return null;
    }
    // const temp2 = record?.travelStatus == checkStatus.travelStatus;
    const temp2 = checkStatus.travelStatus.includes(record?.travelStatus);

    if (temp2) {
      return null;
    }
    return <MarkAsReceived record={record} />;
  };

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

  const MarkAsReceived = ({ record }) => {
    return (
      <Button onClick={() => handleMarkReceived(record)} type="primary">
        Mark Received
      </Button>
    );
  };

  const handleMarkReceived = async (record) => {
    try {
      const result = await markReceived(record?._id);
      if (result instanceof Error || result.status == 'error' || result.success == false) {
        message.error(result.message || 'Could not update!!!');
      } else {
        message.success(result.message || 'Marked received successfully !!!');
        setFetchResource(true);
      }
    } catch (err) {
      message.error(result.message || 'Could not update!!!');
    }
  };
  const filteredData = resources?.filter((item) => {
    if (checkStatus.eventStatus !== item.eventStatus) {
      if (!checkStatus.travelStatus.includes(item.travelStatus)) {
        return item;
      }
    }
  });

  console.log(filteredData, 'filtered data');

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
          // toolBarRender={() => [
          //   <ExcelToJsonConverter key="save-in-bulk" handleSaveInBulk={handleSaveInBulk} />,
          //   <Dropdown key={'send-email'} menu={menuProps}>
          //     <Button type="primary">
          //       <Space>
          //         Send Email
          //         <DownOutlined />
          //       </Space>
          //     </Button>
          //   </Dropdown>,
          //   <Button type="primary" key="primary" onClick={handleAdd}>
          //     <PlusOutlined /> New
          //   </Button>,
          // ]}
          onChange={(_, _filter, _sorter) => {
            let sort = {};
            sort['sort'] = _sorter.field;
            sort['order'] = _sorter.order === 'ascend' ? 1 : -1;
            setSort(sort);
            setCurrent(1);
            setFetchResource(true);
          }}
          dataSource={filteredData}
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
