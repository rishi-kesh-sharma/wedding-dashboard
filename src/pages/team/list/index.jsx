import { PlusOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Pagination, Form, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history, useAccess } from 'umi';
import { search, remove } from '../service';
const TableList = () => {
  const actionRef = useRef();
  const access = useAccess();
  const [data, setData] = useState({ data: [] });
  const [fetchResources, setFetchResources] = useState(false);
  const { confirm } = Modal;
  const fetchResourcesData = async () => {
    const hide = message.loading('Loading...');
    try {
      const result = await search();
      hide();
      setData(result);
      setFetchResources(false);
      return result;
    } catch (error) {
      hide();
      const str = JSON.stringify(error);
      const ex = JSON.parse(str);
      message.error('Something went wrong');
      return false;
    }
  };

  useEffect(() => {
    fetchResourcesData();
  }, [fetchResources]);

  const [form] = Form.useForm();

  const columns = [
    {
      title: ' Name',
      tip: 'name',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              history.push(`/team/edit/${entity._id}`);
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
        <DeleteButton key="delete" record={record} elementId="team-list-delete-btn" />,
      ],
    },
  ];

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
          setFetchResources(true);
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
        <ProTable
          defaultSize="small"
          headerTitle="Team"
          actionRef={actionRef}
          rowKey="_id"
          search={false}
          options={{ reload: false }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                history.push('/team/new');
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
