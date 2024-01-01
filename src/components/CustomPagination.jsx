import usePagination from '@/hooks/usePagination';
import { Pagination } from 'antd';
import React from 'react';

const CustomPagination = ({
  total,
  setFetchResources,
  setPageSize,
  setCurrent,
  showSizeChanger = true,
  showQuickJumper = true,
  current,
  pageSize,
  showTotal = () => `Total ${total} items`,
}) => {
  return (
    <Pagination
      defaultPageSize={pageSize}
      current={current}
      showSizeChanger={showSizeChanger}
      showQuickJumper={showQuickJumper}
      showTotal={showTotal}
      onShowSizeChange={() => setCurrent(1)}
      total={total}
      defaultCurrent={current}
      onChange={(page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
        setFetchResources(true);
      }}
      style={{
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        background: 'white',
        padding: '10px',
      }}
    />
  );
};

export default CustomPagination;
