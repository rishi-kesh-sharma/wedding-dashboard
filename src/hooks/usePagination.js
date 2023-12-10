import React, { useEffect, useState } from 'react';

const usePagination = ({ total, searchObject }) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  useEffect(() => {
    setCurrent(1);
    setPageSize(DEFAULT_PAGE_SIZE);
  }, [searchObject]);
  return { pageSize, setPageSize, current, setCurrent };
};

export default usePagination;
