import { PlusOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Pagination, Form, Row, Col, Input, DatePicker, Modal, Space } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Link, history, useAccess } from 'umi';
import { count, search, remove } from '../service';
import usePagination from '@/hooks/usePagination';
import CustomPagination from '@/components/CustomPagination';
import CardList from '../card-list';

const TableList = () => {
  const [total, setTotal] = useState(0);
  const [fetchResources, setFetchResources] = useState(false);
  const [resources, setResources] = useState([]);
  //  custom pagination hook
  const { current, pageSize, setPageSize, setCurrent } = usePagination({ total });
  const fetchResourcesData = async () => {
    const hide = message.loading('Loading...');
    try {
      const result = await search({
        current: current,
        pageSize,
      });
      hide();
      setResources(result?.data);
      setTotal(result.meta.total);
      setFetchResources(false);
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
    if (fetchResources) {
      fetchResourcesData();
    }
  }, [fetchResources]);
  useEffect(() => {
    setFetchResources(true);
  }, [current]);

  return (
    <>
      <PageContainer pageHeaderRender={false}>
        <Link style={{ marginBottom: '2rem' }} to={'/event/new'}>
          <Button type="primary">Add Event</Button>
        </Link>

        <CardList list={resources} setFetchResources={setFetchResources} />

        <CustomPagination
          total={total}
          setFetchResources={setFetchResources}
          setPageSize={setPageSize}
          setCurrent={setCurrent}
          current={current}
          showSizeChanger={false}
          showQuickJumper={false}
          pageSize={pageSize}
        />
      </PageContainer>
    </>
  );
};

export default TableList;
