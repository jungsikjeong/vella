import React, { useState } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';

import Responsive from '../../../Common/Responsive';

const Container = styled(Responsive)``;

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'price',
    dataIndex: 'price',
  },
  {
    title: 'Images',
    dataIndex: 'images',
  },
];

const data = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    title: `제목 ${i}`,
    description: 32,
    price: `${i}원`,
    images: `이미지 ${i}`,
  });
}

const AdminHome = () => {
  const [SelectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys({ selectedRowKeys });
  };

  const rowSelection = {
    SelectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Container>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </Container>
  );
};

export default AdminHome;
