import { urlToEnhancedFile, urlToFile } from '@/utils';
import React, { useEffect, useState } from 'react';

const useGetFileFromUrl = ({
  resource,
  enhanced = true,
  fieldName = 'image',
  multiple = false,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (resource && resource?.[fieldName]) {
      if (multiple) {
        const getFiles = async () => {
          const filePromises = [];
          for (let i = 0; i < resource?.[fieldName].length; i++) {
            if (enhanced) {
              filePromises.push(urlToEnhancedFile(resource?.[fieldName]?.[i]?.image?.fileUrl));
            } else {
              filePromises.push(urlToFile(`${resource?.[fieldName]?.[i]?.image?.fileUrl}`));
            }
          }
          const files = await Promise.all(filePromises);
          console.log(files, 'the files');
          setData(files);
        };
        if (resource?.[fieldName]?.length > 0) {
          getFiles();
        }
      } else {
        const getFile = async () => {
          let filePromise;
          if (enhanced) {
            filePromise = urlToEnhancedFile(`${resource?.[fieldName]?.image?.fileUrl}`);
          } else {
            filePromise = urlToEnhancedFile(`${resource?.[fieldName]?.image?.fileUrl}`);
          }
          const file = await Promise.all([filePromise]);
          setData(file);
        };
        getFile();
      }
    }
  }, [resource]);
  return data;
};

export default useGetFileFromUrl;
