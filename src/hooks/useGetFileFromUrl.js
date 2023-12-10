import { urlToEnhancedFile, urlToFile } from '@/utils';
import React, { useEffect, useState } from 'react';

const useGetFileFromUrl = ({
  resource,
  enhanced = true,
  fieldName = 'images',
  multiple = true,
}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (multiple) {
      const getFiles = async () => {
        const filePromises = [];
        for (let i = 0; i < resource?.images?.length; i++) {
          if (enhanced) {
            filePromises.push(urlToEnhancedFile(`${API_URL}/${resource?.[fieldName]?.[i]}`));
          } else {
            filePromises.push(urlToFile(`${API_URL}/${resource?.[fieldName]?.[i]}`));
          }
        }
        const files = await Promise.all(filePromises);
        setData(files);
      };
      getFiles();
    } else {
      const getFile = async () => {
        let filePromise;
        if (enhanced) {
          filePromise = urlToEnhancedFile(`${API_URL}/${resource?.[fieldName]}`);
        } else {
          filePromise = urlToEnhancedFile(`${API_URL}/${resource?.[fieldName]}`);
        }
        const file = await Promise.all([filePromise]);
        setData(file);
      };
      getFile();
      console.log(resource, 'the resource');
    }
  }, [resource]);
  return data;
};

export default useGetFileFromUrl;
