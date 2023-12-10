import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Badge, Card, Descriptions, Divider } from 'antd';
import React from 'react';
import { useRequest } from 'umi';
import { queryBasicProfile } from './service';
import styles from './style.less';

const progressColumns = [
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Current Progress',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      if (text === 'success') {
        return <Badge status="success" text="Success" />;
      }
      return <Badge status="processing" text="In Progress" />;
    },
  },
  {
    title: 'Operator ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: 'Duration',
    dataIndex: 'cost',
    key: 'cost',
  },
];

const Basic = () => {
  const { data, loading } = useRequest(() => {
    return queryBasicProfile();
  });
  const { basicGoods, basicProgress } = data || {
    basicGoods: [],
    basicProgress: [],
  };
  let goodsData = [];

  if (basicGoods.length) {
    let num = 0;
    let amount = 0;
    basicGoods.forEach((item) => {
      num += Number(item.num);
      amount += Number(item.amount);
    });
    goodsData = basicGoods.concat({
      id: 'Total',
      num,
      amount,
    });
  }

  const renderContent = (value, _, index) => {
    const obj = {
      children: value,
      props: {},
    };

    if (index === basicGoods.length) {
      obj.props.colSpan = 0;
    }

    return obj;
  };

  const goodsColumns = [
    {
      title: 'Product ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, _, index) => {
        if (index < basicGoods.length) {
          return <span>{text}</span>;
        }

        return {
          children: (
            <span
              style={{
                fontWeight: 600,
              }}
            >
              Total
            </span>
          ),
          props: {
            colSpan: 4,
          },
        };
      },
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: renderContent,
    },
    {
      title: 'Product Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      render: renderContent,
    },
    {
      title: 'Unit Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: renderContent,
    },
    {
      title: 'Quantity (pieces)',
      dataIndex: 'num',
      key: 'num',
      align: 'right',
      render: (text, _, index) => {
        if (index < basicGoods.length) {
          return text;
        }

        return (
          <span
            style={{
              fontWeight: 600,
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (text, _, index) => {
        if (index < basicGoods.length) {
          return text;
        }

        return (
          <span
            style={{
              fontWeight: 600,
            }}
          >
            {text}
          </span>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <Card bordered={false}>
        <Descriptions
          title="Refund Application"
          style={{
            marginBottom: 32,
          }}
        >
          <Descriptions.Item label="Pickup Order Number">1000000000</Descriptions.Item>
          <Descriptions.Item label="Status">Picked Up</Descriptions.Item>
          <Descriptions.Item label="Sales Order Number">1234123421</Descriptions.Item>
          <Descriptions.Item label="Suborder">3214321432</Descriptions.Item>
        </Descriptions>
        <Divider
          style={{
            marginBottom: 32,
          }}
        />
        <Descriptions
          title="User Information"
          style={{
            marginBottom: 32,
          }}
        >
          <Descriptions.Item label="User Name">Fuxiaoxiao</Descriptions.Item>
          <Descriptions.Item label="Contact Number">18100000000</Descriptions.Item>
          <Descriptions.Item label="Preferred Courier">Cainiao Warehousing</Descriptions.Item>
          <Descriptions.Item label="Pickup Address">
            18 Wantang Road, Xihu District, Hangzhou, Zhejiang
          </Descriptions.Item>
          <Descriptions.Item label="Note">None</Descriptions.Item>
        </Descriptions>
        <Divider
          style={{
            marginBottom: 32,
          }}
        />
        <div className={styles.title}>Return Goods</div>
        <ProTable
          style={{
            marginBottom: 24,
          }}
          pagination={false}
          search={false}
          loading={loading}
          options={false}
          toolBarRender={false}
          dataSource={goodsData}
          columns={goodsColumns}
          rowKey="id"
        />
        <div className={styles.title}>Return Progress</div>
        <ProTable
          style={{
            marginBottom: 16,
          }}
          pagination={false}
          loading={loading}
          search={false}
          options={false}
          toolBarRender={false}
          dataSource={basicProgress}
          columns={progressColumns}
        />
      </Card>
    </PageContainer>
  );
};

export default Basic;
