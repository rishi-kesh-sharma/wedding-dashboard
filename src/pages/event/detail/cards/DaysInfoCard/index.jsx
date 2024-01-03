import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Modal, Typography } from 'antd';
import styles from './style.less';
import DayCard from './Card';
import { useState } from 'react';
import DayModal from '../../modals/DayModal';
import { removeDay } from '@/pages/event/service';

const DaysCardList = ({ data, setFetchResource }) => {
  const list = data?.days;
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
  const showDeleteConfirm = (day) => {
    confirm({
      title: `Do you Want to delete? `,
      icon: <ExclamationCircleOutlined />,
      content: `Day will be deleted permanently.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        console.log('OK');
        const r = await removeDay(day?._id);
        setFetchResource(true);
        if (r.success) {
          message.success(r?.message || 'Delete successfully!!');
          // setFetchResources(true);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const handleDelete = (day) => {
    showDeleteConfirm(day);
  };
  return (
    // <PageContainer>
    <div className={styles.cardList}>
      {list && (
        <List
          rowKey="id"
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
                  <DayCard data={item} handleDelete={handleDelete} handleEdit={handleEdit} />
                </List.Item>
              );
            }

            return (
              <List.Item onClick={handleAdd}>
                <Button type="dashed" className={styles.newButton}>
                  <PlusOutlined /> Add New Day
                </Button>
              </List.Item>
            );
          }}
        />
      )}
      <DayModal
        setFetchResource={setFetchResource}
        visible={modalVisible}
        setVisible={setModalVisible}
        eventId={eventId}
        current={current}
      />
    </div>
  );
};

export default DaysCardList;
