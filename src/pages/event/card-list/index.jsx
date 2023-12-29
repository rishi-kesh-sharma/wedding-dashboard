import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Image, List, Typography, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import { queryFakeList } from './service';
import styles from './style.less';
import { fakeList } from './_mock';
import { getAvatar } from '@/data/util';
const { Paragraph } = Typography;
import EventImage from '../../../assets/cover.jpg';
import moment from 'moment';
import { remove } from '../service';

const CardList = ({ list, setFetchResources }) => {
  const { confirm } = Modal;

  const showDeleteConfirm = (event) => {
    confirm({
      title: `Do you Want to delete? `,
      icon: <ExclamationCircleOutlined />,
      content: `Event will be deleted permanently.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        console.log('OK');
        const r = await remove(event?._id);
        setFetchResources(true);
        if (r.success) {
          message.success(r?.message || 'Deleted successfully!!');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const handleDelete = (event) => {
    showDeleteConfirm(event);
  };
  return (
    // <PageContainer>
    <div className={styles.cardList}>
      {list && (
        <List
          style={{ marginTop: '2rem' }}
          rowKey="id"
          // loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={[...list]}
          renderItem={(item) => {
            if (item && item._id) {
              return (
                <List.Item
                  key={item._id}
                  style={{
                    minWidth: '600px !important',
                  }}
                >
                  <Card
                    cover={
                      <Image
                        alt=""
                        style={{
                          maxHeight: '100px',
                          objectFit: 'contain',
                          minWidth: '200px !important',
                        }}
                        src={
                          item?.backgrounds?.length > 0
                            ? item?.backgrounds?.[0]?.image?.fileUrl
                            : EventImage
                        }
                      />
                    }
                    hoverable
                    className={styles.card}
                    actions={[
                      <Link to={`/event/${item._id}`} key="option1">
                        <EyeOutlined key="view" />,
                      </Link>,
                      <DeleteOutlined onClick={() => handleDelete(item)} key="delete" />,
                    ]}
                  >
                    <p style={{ fontSize: '0.7rem', fontWeight: '500' }}>{item?.title}</p>
                    <div>
                      {/* <Typography.Text>Start Date and Time</Typography.Text> */}
                      <p>{moment(item?.startDateTime).lang('en').format('LLL')}</p>
                    </div>
                    <div>
                      {/* <Typography.Text>End Date and Time</Typography.Text> */}
                      <p>{moment(item?.endDateTime).lang('en').format('LLL')}</p>
                    </div>
                  </Card>
                </List.Item>
              );
            }

            return (
              <List.Item>
                <Button type="dashed" className={styles.newButton}>
                  <PlusOutlined /> Add New Event
                </Button>
              </List.Item>
            );
          }}
        />
      )}
    </div>
    // </PageContainer>
  );
};

export default CardList;
