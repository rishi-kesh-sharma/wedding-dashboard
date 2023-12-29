import { PageContainer } from '@ant-design/pro-layout';
import { getById } from '../service';
import React, { useEffect, useState } from 'react';
import Tabs from './tabs';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);
  const [fetchResource, setFetchResource] = useState(false);
  useEffect(() => {
    const id = props?.match?.params?.id;
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item);
    };
    getResource(id);
    setFetchResource(false);
  }, [fetchResource]);

  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Tabs
          data={resource.data}
          fetchResource={fetchResource}
          setFetchResource={setFetchResource}
        />
      </PageContainer>
    )
  );
};

export default EditForm;
