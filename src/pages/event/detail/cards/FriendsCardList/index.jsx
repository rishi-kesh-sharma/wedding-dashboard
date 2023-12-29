import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FacebookOutlined,
  InstagramOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Image, List, Typography, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import { queryFakeList } from './service';
import styles from './style.less';
import { fakeList } from './_mock';
import { getAvatar } from '@/data/util';
import FriendsModal from '../../modals/FriendsModal';
import { useState } from 'react';
import { removeFriend } from '@/pages/event/service';
const { Paragraph, Text, Title } = Typography;

const FriendsCardList = ({ data, setFetchResource }) => {
  const list = data?.closeFriends;
  const eventId = data?._id;
  const [modalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const { confirm } = Modal;

  const handleAdd = () => {
    setCurrent(null);
    setModalVisible(true);
  };
  const handleEdit = (item) => {
    setModalVisible(true);
    setCurrent(item);
  };
  const showDeleteConfirm = (friend) => {
    confirm({
      title: `Do you Want to delete? `,
      icon: <ExclamationCircleOutlined />,
      content: `Friend will be deleted permanently.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        console.log('OK');
        const r = await removeFriend(friend?._id);
        setFetchResource(true);
        if (r.success) {
          message.success(r?.message || 'Deleted successfully!!');
          // setFetchResources(true);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    return;
  };
  const handleDelete = (friend) => {
    showDeleteConfirm(friend);
  };

  return (
    // <PageContainer>
    <div className={styles.cardList}>
      {list && (
        <List
          rowKey="id"
          // loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={[{}, ...list]}
          renderItem={(item) => {
            if (item && item?._id) {
              return (
                <List.Item key={item._id}>
                  <Card
                    cover={
                      <Image
                        style={{ objectFit: 'contain', maxHeight: '150px' }}
                        alt=""
                        src={item?.image ? `${item?.image?.image?.fileUrl}` : getAvatar(item?.name)}
                      />
                    }
                    // style={{ width: 300 }}
                    hoverable
                    className={styles.card}
                    actions={[
                      <EyeOutlined key="view" />,
                      <EditOutlined onClick={() => handleEdit(item)} key="edit" />,
                      <DeleteOutlined onClick={() => handleDelete(item)} key="delete" />,
                    ]}
                  >
                    {/* <Card.Meta title={<Title level={5}>{item.name}</Title>} /> */}
                    <div>
                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <p style={{ fontWeight: '600', marginRight: '0.3rem' }}>Name:</p>
                        <p style={{ fontWeight: '600', marginRight: '0.3rem' }}>{item?.name}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <p style={{ fontWeight: '600', marginRight: '0.3rem' }}>Relation:</p>
                        <p style={{ fontWeight: '600', marginRight: '0.3rem' }}>{item?.relation}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <p style={{ fontWeight: '600', marginRight: '0.3rem' }}>Side:</p>
                        <p style={{ fontWeight: '600', marginRight: '0.3rem' }}>{item?.side}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        {item?.fbLink && (
                          <a rel="noreferrer" target="_blank" href={item?.fbLink}>
                            <FacebookOutlined
                              style={{ fontWeight: '600', marginRight: '0.3rem', color: 'gray' }}
                            />
                          </a>
                        )}
                        {item?.instaLink && (
                          <a rel="noreferrer" target="_blank" href={item?.instaLink}>
                            <InstagramOutlined
                              style={{ fontWeight: '600', marginRight: '0.3rem', color: 'gray' }}
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </List.Item>
              );
            }

            return (
              <List.Item onClick={handleAdd}>
                <Button type="dashed" className={styles.newButton}>
                  <PlusOutlined /> Add New Friend
                </Button>
              </List.Item>
            );
          }}
        />
      )}
      <FriendsModal
        setFetchResource={setFetchResource}
        visible={modalVisible}
        setVisible={setModalVisible}
        eventId={eventId}
        current={current}
      />
    </div>
  );
};

export default FriendsCardList;
