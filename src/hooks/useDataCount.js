import React from 'react';

const useDataCount = ({ fetchUser, param }) => {
  const fetchDataCount = async () => {
    const result = await count({ ...param });
    setTotal(result.total);
  };
  useEffect(() => {
    if (fetchUser) {
      fetchDataCount();
    }
  }, [fetchUser]);
};

export default useDataCount;
