import { PlusOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Pagination, Form, Row, Col, Input, DatePicker, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Link, history, useAccess } from 'umi';
import { count, search, remove } from '../service';

const TableList = () => {
  const actionRef = useRef();
  const access = useAccess();
  const [data, setData] = useState({ data: [] });
  const [fetchResources, setFetchResources] = useState(false);
  const { confirm } = Modal;
  //  custom pagination hook
  const fetchResourcesData = async () => {
    const hide = message.loading('Loading...');
    try {
      const result = await search({});
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

  useEffect(() => {
    fetchResourcesData();
  }, [fetchResources]);
  const columns = [
    {
      title: ' Question',
      sorter: true,
      tip: 'question',
      dataIndex: 'question',
      render: (dom, entity) => {
        return (
          <Link
            onClick={() => {
              history.push(`/faq/edit/${entity._id}`);
            }}
          >
            {`${entity.question}`}
          </Link>
        );
      },
    },

    {
      title: 'Answer',
      dataIndex: 'answer',
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <DeleteButton key="delete" record={record} elementId="agency-list-delete-btn" />,
      ],
    },
  ];

  const DeleteButton = (props) => {
    const { elementId } = props;

    const showDeleteConfirm = (item) => {
      confirm({
        title: `Do you Want to delete this faq?`,
        icon: <ExclamationCircleOutlined />,
        content: `This  will be deleted permanently.`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          console.log('OK');
          const r = await remove(item._id);
          setFetchResources(true);
          if (r.success) {
            message.success(r.message || 'Deleted successfully!!');
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
        <ProTable
          defaultSize="small"
          headerTitle="FAQs"
          actionRef={actionRef}
          rowKey="_id"
          search={false}
          options={{ reload: false }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                history.push('/faq/new');
              }}
            >
              <PlusOutlined /> New
            </Button>,
          ]}
          dataSource={data.data}
          columns={columns}
          rowSelection={false}
          pagination={{
            pageSize: 10,
          }}
        />
      </PageContainer>
    </>
  );
};

export default TableList;
