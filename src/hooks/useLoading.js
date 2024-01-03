import React, { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(null);
  return {
    loading,
    setLoading,
  };
};

export default useLoading;
