import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../../../_actions/product';
import { Redirect } from 'react-router';

// Components
import Responsive from '../../../Common/Responsive';

const Container = styled(Responsive)`
  overflow-x: hidden;

  img {
    height: 100px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  // 테이블 세로 가운데 정렬
  td {
    height: 130px;
    display: table-cell;
    vertical-align: middle;
  }

  // 카테고리 아이콘
  .ant-table-selection-extra {
    margin-left: 1.7rem;
  }

  h1 {
    text-align: center;
    padding-bottom: 1rem;
  }
`;

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: (price) => `${price}원`,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: 'Images',
    dataIndex: 'images',
    render: (images) => (
      <img src={`http://localhost:5000/${images[0]}`} alt='' />
    ),
  },
];

const AdminHome = () => {
  const user = useSelector((state) => state.auth.user);
  const product = useSelector((state) => state.product);
  const loading = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();

  const [SelectedRowKeys, setSelectedRowKeys] = useState([]);
  const [CurrentCategory, setCurrentCategory] = useState('All');

  let data = [];
  // 서버에 보내줄 카테고리 넘버, 서버 필터에 넣어줄 데이터
  let categoryNumber = '';

  // 테이블 컬럼에 넣어줄 데이터
  product.products.map((item) =>
    data.push({
      key: item._id,
      title: item.title,
      description: item.description,
      price: item.price,
      images: item.images,
    })
  );

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys({ selectedRowKeys });
  };

  const rowSelection = {
    SelectedRowKeys,
    onChange: onSelectChange,
    selections: [
      // 카테고리 All 선택시 보여지는 화면 설정
      {
        key: 'all',
        text: 'All',
        onSelect: (changeProduct) => {
          categoryNumber = '';
          setCurrentCategory('All');
          dispatch(getAllPosts(''));
        },
      },

      // 카테고리 Top 선택시 보여지는 화면 설정
      {
        key: 'top',
        text: 'Top',
        onSelect: (changeProduct) => {
          categoryNumber = '1';
          let body = {
            categoryNumber,
          };
          setCurrentCategory('Top');
          dispatch(getAllPosts({ body }));
        },
      },
      // 카테고리 Bottom 선택시 보여지는 화면 설정
      {
        key: 'bottom',
        text: 'Bottom',
        onSelect: (changeProduct) => {
          categoryNumber = '2';
          let body = {
            categoryNumber,
          };
          setCurrentCategory('Bottom');
          dispatch(getAllPosts({ body }));
        },
      },

      // 카테고리 Dress 선택시 보여지는 화면 설정
      {
        key: 'dress',
        text: 'Dress',
        onSelect: (changeProduct) => {
          categoryNumber = '3';
          let body = {
            categoryNumber,
          };
          setCurrentCategory('Dress');
          dispatch(getAllPosts({ body }));
        },
      },

      // 카테고리 Outer 선택시 보여지는 화면 설정
      {
        key: 'outer',
        text: 'Outer',
        onSelect: (changeProduct) => {
          categoryNumber = '4';
          let body = {
            categoryNumber,
          };
          setCurrentCategory('Outer');
          dispatch(getAllPosts({ body }));
        },
      },

      // 카테고리 Promotion 선택시 보여지는 화면 설정
      {
        key: 'promotion',
        text: 'Promotion',
        onSelect: (changeProduct) => {
          categoryNumber = '5';
          let body = {
            categoryNumber,
          };
          setCurrentCategory('Promotion');
          dispatch(getAllPosts({ body }));
        },
      },

      // 카테고리 Acc 선택시 보여지는 화면 설정
      {
        key: 'acc',
        text: 'Acc',
        onSelect: (changeProduct) => {
          categoryNumber = '6';
          let body = {
            categoryNumber,
          };
          setCurrentCategory('Acc');
          dispatch(getAllPosts({ body }));
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(getAllPosts(''));
  }, [dispatch]);

  // if (!user || !user.admin || user.admin === null) {
  //   return <Redirect to='/admin' />;
  // }

  return (
    <Container>
      {loading ? (
        <div style={{ overflow: 'hidden' }}>Loading ...</div>
      ) : (
        <>
          <h1>{CurrentCategory}</h1>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </>
      )}
    </Container>
  );
};

export default AdminHome;
// let newProducts = [];

// newProducts = product.products.filter(
//   (item) => item.categories === 1
// );

// data = [];

// newProducts.map((item) =>
//   data.push({
//     key: item._id,
//     title: item.title,
//     description: item.description,
//     price: item.price,
//     images: item.images,
//   })
// );
