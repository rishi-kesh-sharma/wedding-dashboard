import { Button, Card, Form, Image, Upload, message } from 'antd';
import ProForm, { ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import {
  getAmenities,
  getById,
  getCategory,
  getHighlights,
  getSubCategory,
  update,
} from '../service';
import React, { useEffect, useState } from 'react';
import GoogleMapComponent from '@/data/GoogleMapComponent';
import CustomUpload from '@/components/CustomUpload';
import useGetFileFromUrl from '@/hooks/useGetFileFromUrl';
import getFormProps from '@/data/getFormProps';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [fileList, setFileList] = useState([]);
  const { id } = props.match.params;
  const files = useGetFileFromUrl({ resource: resource });
  const [form] = Form.useForm();
  const fetchCategories = async () => {
    const result = await getCategory();
    const options = result.data.map((r) => ({ label: r.alias, value: r._id }));
    return options;
  };
  const handleLocationSelect = (location) => {
    setLatitude(location.lat);
    setLongitude(location.lng);
  };
  const fetchSubCategories = async () => {
    const result = await getSubCategory();
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

  const onFinish = async (values) => {
    const {
      name,
      purpose,
      furnishingStatus,
      rentFrequency,
      price,
      description,
      category,
      subCategory,
      isFeatured,
      hasPrice,
    } = values;

    const location = {
      ward: values.location.ward,
      province: values.location.province,
      district: values.location.district,
      municipality: values.location.municipality,
      tole: values.location.tole,
    };

    const contactInfo = {
      email: values.contactInfo.email,
      phone: values.contactInfo.phone,
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

    for (const key in amenitiesObj) {
      formData.append('amenities', amenitiesObj[key]);
    }

    for (const key in highlightsObj) {
      formData.append('highlights', highlightsObj[key]);
    }

    formData.append('mapIframe', values.mapIframe);
    formData.append('_id', resource._id);
    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }
    const result = await update(formData);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
      history.push('/property/list');
    }
  };

  let extractedString = '';
  useEffect(() => {
    if (resource && resource.mapIframe) {
      const start = resource.mapIframe.indexOf('"') + 1;
      const end = resource.mapIframe.lastIndexOf('"');
      if (start !== -1 && end !== -1 && end > start) {
        extractedString = resource.mapIframe.slice(start, end);
        const urlParts = extractedString.split('=');
        const coordinates = urlParts[1].split(',');
        setLatitude(coordinates[0]);
        setLongitude(coordinates[1]);
      }
    }
    setFileList(files);
  }, [resource]);
  useEffect(() => {
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item);
    };
    getResource(id);
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({
      mapIframe: `<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}"></iframe>`,
    });
  }, [latitude, longitude]);
  useEffect(() => {
    setFileList(files);
  }, [files]);

  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Card title="Property Update Form" bordered={false}>
          <ProForm {...getFormProps({ form, onFinish, resource })}>
            <ProFormText
              width="lg"
              label="Name"
              name="name"
              value={resource.name}
              rules={[
                {
                  required: true,
                  message: 'Please enter role name',
                },
              ]}
              placeholder="Please enter role name"
            />
            <ProFormText
              width="lg"
              label="Email"
              name={['contactInfo', 'email']}
              value={resource?.contactInfo?.email}
              rules={[
                {
                  required: true,
                  message: 'Please enter email address',
                },
              ]}
              placeholder="Please enter email address"
            />
            <ProFormText
              width="lg"
              label="Contact Number"
              value={resource?.contactInfo?.phone}
              name={['contactInfo', 'phone']}
              rules={[
                {
                  required: true,
                  message: 'Please enter phone number',
                },
              ]}
              placeholder="Please enter phone number"
            />
            <ProFormSelect
              width="lg"
              name="purpose"
              label="Purpose"
              value={resource.purpose}
              options={[
                {
                  value: 'rent',
                  label: 'Rent',
                },
                {
                  value: 'sell',
                  label: 'Sell',
                },
              ]}
              placeholder="Please select purpose"
              rules={[{ required: true, message: 'Please select purpose' }]}
              // onChange={(value, e) => setRole({ resourceId: value, resourceAlias: e.label })}
            />
            <ProFormSelect
              width="lg"
              name="rentFrequency"
              value={resource.rentFrequency}
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
              placeholder="Please select rent frequency"
              rules={[{ required: false, message: 'Please select rent frequency' }]}
            />
            <ProFormText
              width="lg"
              label="Price"
              name="price"
              value={resource.price}
              rules={[
                {
                  required: false,
                  message: 'Please enter the Price',
                },
              ]}
              placeholder="Please enter resource Price"
            />
            <ProFormText
              width="lg"
              label="furnishingStatus"
              name="furnishingStatus"
              value={resource.furnishingStatus}
              rules={[
                {
                  required: false,
                  message: 'Please enter the furnishingStatus',
                },
              ]}
              placeholder="Please enter resource furnishingStatus"
            />

            <ProFormText
              width="lg"
              label="isSold"
              value={resource.isSold}
              name="isSold"
              rules={[
                {
                  required: false,
                  message: 'Please enter the isSold',
                },
              ]}
              placeholder="Please enter the isSold"
            />
            <ProFormText
              width="lg"
              label="Province"
              value={resource?.location?.province}
              name={['location', 'province']}
              rules={[
                {
                  required: true,
                  message: 'Please enter province',
                },
              ]}
              placeholder="Please enter province"
            />
            <ProFormText
              width="lg"
              label="District"
              value={resource.location?.district}
              name={['location', 'district']}
              rules={[
                {
                  required: true,
                  message: 'Please enter district',
                },
              ]}
              placeholder="Please enter district"
            />
            <ProFormText
              width="lg"
              label="Municipality"
              value={resource.location?.municipality}
              name={['location', 'municipality']}
              rules={[
                {
                  required: true,
                  message: 'Please enter municipality',
                },
              ]}
              placeholder="Please enter municipality"
            />
            <ProFormText
              width="lg"
              label="Ward"
              value={resource.location?.ward}
              name={['location', 'ward']}
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
              value={resource.location?.tole}
              name={['location', 'tole']}
              rules={[
                {
                  required: true,
                  message: 'Please enter tole',
                },
              ]}
              placeholder="Please enter ward"
            />
            <ProFormSelect
              width="lg"
              label="highlights"
              value={resource.highlights}
              name="highlights"
              request={fetchHighlights}
              rules={[
                {
                  required: true,
                  message: 'Please enter highlights',
                },
              ]}
              placeholder="Please enter highlights"
              mode="multiple"
            />
            <ProFormSelect
              width="lg"
              label="Amenities"
              value={resource.amenities}
              name="amenities"
              request={fetchAmenities}
              rules={[
                {
                  required: true,
                  message: 'Please enter amenities',
                },
              ]}
              placeholder="Please enter amenities"
              mode="multiple"
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
              value={resource.isFeatured}
              label="Is Featured"
              options={[
                {
                  value: true,
                  label: 'True',
                },
                {
                  value: false,
                  label: 'False',
                },
              ]}
              placeholder="Please select a isFeatured"
              rules={[{ required: true, message: 'Please select a isFeatured' }]}
            />
            <ProFormSelect
              width="lg"
              name="hasPrice"
              label="Has Price"
              value={resource.hasPrice}
              options={[
                {
                  value: true,
                  label: 'True',
                },
                {
                  value: false,
                  label: 'false',
                },
              ]}
              placeholder="Please select a Has Price"
              rules={[{ required: true, message: 'Please select a Has Price' }]}
            />
            <ProFormText readonly hidden name="mapIframe" />
            <ProFormTextArea
              width="lg"
              label="Description"
              value={resource.description}
              name="description"
              rules={[
                {
                  required: false,
                  message: 'Please enter the description',
                },
                {
                  max: 600,
                  message: 'Description cannot be longer than 500 characters',
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
            <br />

            <CustomUpload
              fileList={fileList}
              setFileList={setFileList}
              maxFileLength={5}
              multiple={true}
              defaultPreviewTitle="Property Image"
            />
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
