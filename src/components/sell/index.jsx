import { Button, Input, Modal } from 'antd';
import { useState } from 'react';

const SellModal = ({ isModalOpen, handleCancel, handleOk, price, setPrice, data }) => {
  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="sell">
      <label>Selling Price </label>
      <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
    </Modal>
  );
};

export default SellModal;
