import React, { useEffect, useState } from 'react';
import { Form, Card, message, Select, Upload } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormSelect,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import {
  getAmenities,
  getCategory,
  getHighlights,
  getSubCategory,
  save,
  uploadMultipleImage,
} from '../service';
import { Municipality } from '@/data/Municipalities';
import { Districts } from '@/data/Districts';
import GoogleMapComponent from '@/data/GoogleMapComponent';
import formProps from '@/data/getFormProps';
import getFormProps from '@/data/getFormProps';

const EntryForm = (props) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [mapIframe, setMapIframe] = useState(
    `<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}"></iframe>`,
  );
  const [fileList, setFileList] = useState([]);

  ////function f=s for picking the location of the doctors
  const handleLocationSelect = (location) => {
    setLatitude(location.lat);
    setLongitude(location.lng);
  };
  const fetchCategories = async () => {
    const result = await getCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const fetchAmenities = async () => {
    const result = await getAmenities();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const fetchHighlights = async () => {
    const result = await getHighlights();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const fetchSubCategories = async () => {
    const result = await getSubCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    const {
      name,
      purpose,
      furnishingStatus,
      rentFrequency,
      price,
      description,
      category,
      subCategory,
      room,
      builtUpArea,
      bathroom,
      isFeatured,
      hasPrice,
    } = values;

    const location = {
      ward: values.ward,
      province: values.province,
      district: values.district,
      municipality: values.municipality,
      tole: values.tole,
    };
    const contactInfo = {
      email: values.email,
      phone: values.phone,
    };
    const formData = new FormData();
    const amenitiesObj = {};
    const highlightsObj = {};

    values.amenities.forEach((amenity, index) => {
      amenitiesObj[`amenities[${index}]`] = amenity;
    });

    values.highlights.forEach((highlight, index) => {
      highlightsObj[`highlights[${index}]`] = highlight;
    });
    for (const key in contactInfo) {
      formData.append(`contactInfo[${key}]`, contactInfo[key]);
    }

    for (const key in location) {
      formData.append(`location[${key}]`, location[key]);
    }

    formData.append('name', name);
    formData.append('purpose', purpose);
    formData.append('furnishingStatus', furnishingStatus);
    formData.append('rentFrequency', rentFrequency);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('isFeatured', isFeatured);
    formData.append('hasPrice', hasPrice);
    formData.append('room', room);
    formData.append('bathroom', bathroom);
    formData.append('builtUpArea', builtUpArea);

    for (const key in amenitiesObj) {
      formData.append('amenities', amenitiesObj[key]);
    }

    for (const key in highlightsObj) {
      formData.append('highlights', highlightsObj[key]);
    }

    // for (const key in values) {
    //   formData.append(key, values[key]);
    // }
    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }
    formData.append('mapIframe', values.mapIframe);

    for (var pair of formData.entries()) {
      console.log(pair[0] + '====== ' + pair[1]);
    }

    for (let [key, value] of formData.entries()) {
      if (value === '' || value === null || value === undefined || value === 'undefined') {
        console.log('deleting', key, value);
        formData.delete(key);
      }
    }

    const result = await save(formData);
    console.log('property', result);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
      setFileList([]);
    }
  };
  const onChange = (info) => {
    if (info.file.type.startsWith('image/')) {
      setFileList(info.fileList);
    } else {
      message.error('File type must be image');
    }
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
  };

  useEffect(() => {
    setMapIframe(`<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}"></iframe>`);

    form.setFieldsValue({
      mapIframe: `<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}"></iframe>`,
    });
  }, [latitude, longitude]);

  console.log(form.getFieldValue('mapIframe'));

  const uploadImage = async () => {
    for (const file of fileList) {
      const response = await uploadMultipleImage(file.originFileObj);
      console.log(response);
    }
  };

  useEffect(() => {
    uploadImage();
  }, [fileList]);
  console.log(mapIframe);
  return (
    <PageContainer pageHeaderRender={false}>
      <Card title="Property Entry Form" bordered={false}>
        <ProForm
          // hideRequiredMark
          {...getFormProps({ form, onFinish, resource: null })}
        >
          <ProFormText
            width="lg"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter property name',
              },
              {
                min: 15,
                message: 'Must be at least 10 characters',
              },
            ]}
            placeholder="Please enter property name"
          />
          <ProFormText
            width="lg"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter email address',
              },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter valid email!',
              },
            ]}
            placeholder="Please enter email address"
          />
          <ProFormText
            width="lg"
            label="Contact Number"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please enter phone number!',
              },
              {
                pattern: /(\+977)?[9][6-9]\d{8}/,
                message: 'Enter valid phone number!',
              },
            ]}
            placeholder="Please enter phone number"
          />

          <ProFormSelect
            width="lg"
            name="purpose"
            label="Purpose"
            options={[
              {
                value: 'rent',
                label: 'Rent',
              },
              {
                value: 'sale',
                label: 'Sale',
              },
            ]}
            placeholder="Please select purpose"
            rules={[{ required: true, message: 'Please select purpose' }]}
          />
          <ProFormSelect
            width="lg"
            name="highlights"
            label="Highlights"
            request={fetchHighlights}
            mode="multiple"
            placeholder="Please select highlights"
            rules={[{ required: true, message: 'Please select highlights' }]}
          />
          <ProFormSelect
            width="lg"
            name="amenities"
            label="Amenities"
            request={fetchAmenities}
            mode="multiple"
            placeholder="Please select amenities"
            rules={[{ required: true, message: 'Please select amenities' }]}
          />

          <ProFormText
            width="lg"
            label="Province"
            name="province"
            rules={[
              {
                required: true,
                message: 'Please enter province',
              },
              {
                type: 'string',
              },
              {
                min: 3,
              },
              {
                max: 40,
              },
            ]}
            placeholder="Please enter province"
          />
          <ProFormText
            width="lg"
            label="District"
            name="district"
            rules={[
              {
                required: true,
                message: 'Please enter district',
              },
              {
                min: 3,
              },
              {
                max: 40,
              },
            ]}
            placeholder="Please enter district"
          />
          <ProFormText
            width="lg"
            label="Municipality"
            name="municipality"
            rules={[
              {
                required: true,
                message: 'Please enter municipality',
              },
              {
                max: 50,
              },
              { min: 3 },
            ]}
            placeholder="Please enter municipality"
          />
          <ProFormDigit
            fieldProps={{ type: 'number', max: 40 }}
            width="lg"
            label="Ward"
            name="ward"
            rules={[
              {
                required: true,
                message: 'Please enter ward',
              },
            ]}
            placeholder="Please enter ward"
          />
          <ProFormText
            width="lg"
            label="Tole"
            name="tole"
            rules={[
              {
                required: true,
                message: 'Please enter tole',
              },

              {
                min: 3,
              },
              {
                max: 40,
              },
            ]}
            placeholder="Please enter ward"
          />
          <ProFormSelect
            width="lg"
            name="category"
            label="Category"
            request={fetchCategories}
            placeholder="Please select a category"
            rules={[{ required: true, message: 'Please select a category' }]}
          />
          <ProFormSelect
            width="lg"
            name="subCategory"
            label="Sub Category"
            request={fetchSubCategories}
            placeholder="Please select a sub category"
            rules={[{ required: true, message: 'Please select a sub category' }]}
          />
          <ProFormSelect
            width="lg"
            name="isFeatured"
            label="Is Featured"
            options={[
              {
                value: 'true',
                label: 'True',
              },
              {
                value: 'false',
                label: 'False',
              },
            ]}
            placeholder="Please select a value"
            rules={[{ required: true, message: 'Please select a isFeatured' }]}
          />
          <ProFormSelect
            width="lg"
            name="hasPrice"
            label="Has Price"
            options={[
              {
                value: 'true',
                label: 'True',
              },
              {
                value: 'false',
                label: 'false',
              },
            ]}
            placeholder="Please select a Has Price"
            rules={[{ required: true, message: 'Please select a Has Price' }]}
          />
          <ProFormSelect
            width="lg"
            name="furnishingStatus"
            label="Furnishing Status"
            options={[
              {
                value: 'not-furnished',
                label: 'Not Furnished',
              },
              {
                value: 'semi-furnished',
                label: 'Semi Furnished',
              },
              {
                value: 'fully-furnished',
                label: 'Fully Furnished',
              },
            ]}
            placeholder="Please select furnishingStatus"
            rules={[{ required: false, message: 'Please select furnishingStatus' }]}
          />
          <ProFormSelect
            width="lg"
            name="rentFrequency"
            label="Rent Frequency"
            options={[
              {
                value: 'day',
                label: 'Day',
              },
              {
                value: 'week',
                label: 'Week',
              },
              {
                value: 'month',
                label: 'Month',
              },
              {
                value: 'year',
                label: 'Year',
              },
            ]}
            placeholder="Please select purpose"
            rules={[{ required: false, message: 'Please select purpose' }]}
          />
          <ProFormDigit
            fieldProps={{ type: 'number', min: 0, max: 100000000 }}
            width="lg"
            label="Price"
            name="price"
            rules={[
              {
                required: false,
                message: 'Please enter the Price',
              },
            ]}
            placeholder="Please enter property Price"
          />
          <ProFormDigit
            fieldProps={{ type: 'number', min: 0, max: 30 }}
            width="lg"
            label="Room"
            name="room"
            rules={[
              {
                required: false,
                message: 'Please enter the no of room',
              },
            ]}
            placeholder="Please enter the no of room"
          />

          <ProFormDigit
            fieldProps={{ type: 'number', min: 0, max: 10 }}
            width="lg"
            label="No of Bathroom"
            name="bathroom"
            rules={[
              {
                required: false,
                message: 'Please enter the no of bath',
              },
            ]}
            placeholder="Please enter the no of bath"
          />
          <ProFormDigit
            fieldProps={{ type: 'number', min: 0, max: 100000 }}
            width="lg"
            label="Built up area (sq.m)"
            name="builtUpArea"
            rules={[
              {
                required: false,
                message: 'Please enter the built up area',
              },
            ]}
            placeholder="Please enter the built up area"
          />
          <ProFormTextArea
            width="lg"
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please enter the description',
              },
              { min: 30 },
              {
                max: 1000,
              },
            ]}
            placeholder="Please enter the description"
          />
          <GoogleMapComponent
            onLocationSelect={handleLocationSelect}
            latitude={latitude}
            longitude={longitude}
          />

          <label>Image</label>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple="true"
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
          <ProFormText
            // width="lg"
            initialValue={mapIframe}
            readonly
            hidden={true}
            name="mapIframe"

            // rules={[
            //   {
            //     required: true,
            //     message: 'Please enter map Iframe',
            //   },
            // ]}
            // placeholder="Please enter mapIframe"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
