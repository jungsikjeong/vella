import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getAllReviews, removeReviews } from '../../../../_actions/review';

// Components
import Responsive from '../../../Common/Responsive';
import AskRemoveModal from '../../../Common/AskModal/AskRemoveModal';
import Loading from '../../../Common/Loading';
import AdminHeader from '../AdminHeader/AdminHeader';

const Container = styled(Responsive)`
  overflow-x: hidden;

  img {
    width: 50px;
    height: 100px;
    object-fit: cover;

    @media (min-width: 800px) {
      width: inherit;
    }
  }

  /* div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  } */

  .ant-table-thead > tr > th {
    font-size: 0.58rem;
    @media (min-width: 800px) {
      font-size: 0.7rem;
    }
  }

  th {
    vertical-align: middle;
  }

  // 테이블 세로 가운데 정렬
  td {
    vertical-align: middle;
  }

  // 카테고리 아이콘
  .ant-table-selection-extra {
  }

  h1 {
    text-align: center;
    padding-bottom: 1rem;
    font-size: 0.7rem;

    @media (min-width: 800px) {
      font-size: 1rem;
    }
  }

  // remove 컬럼
  th:nth-child(6) {
    width: 2.5rem;
    text-align: center;
    font-size: 1rem;
  }
`;

const AdminReviews = () => {
  const { reviews, loading } = useSelector(({ review }) => ({
    reviews: review.reviews,
    loading: review.loading,
  }));

  const dispatch = useDispatch();

  const [SelectedRowKeys, setSelectedRowKeys] = useState([]);
  const [Modal, setModal] = useState(false);

  let data = [];

  //   테이블 컬럼에 넣어줄 데이터
  reviews.map((item) =>
    data.push({
      key: item._id,
      id: item._id,
      title: item.title,
      description: item.description,
      writer: item.user.nickname,
      images: item.images,
    })
  );

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys({ selectedRowKeys });
  };

  const onRemoveClick = () => {
    if (SelectedRowKeys.selectedRowKeys.length === 0) {
      return;
    }
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = (reviewId) => {
    dispatch(removeReviews(reviewId));
    setModal(false);
  };

  const rowSelection = {
    SelectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const columns = [
    {
      title: 'Images',
      dataIndex: 'images',
      render: (images, id) => (
        <Link to={`/review/${id.id}`} target='_blank'>
          <img src={`http://localhost:5000/${images[0]}`} alt='' />
        </Link>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (title, id) => (
        <Link to={`/review/${id.id}`} target='_blank'>
          {title}
        </Link>
      ),
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (description, id) => (
        <Link to={`/review/${id.id}`} target='_blank'>
          <span
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></span>
        </Link>
      ),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Writer',
      dataIndex: 'writer',
      render: (writer, id) => (
        <Link to={`/review/${id.id}`} target='_blank'>
          {writer}
        </Link>
      ),
      ellipsis: {
        showTitle: false,
      },
    },

    // 리뷰 삭제
    {
      title: (
        <DeleteOutlined
          onClick={() => onRemoveClick(SelectedRowKeys)}
          style={{
            color:
              !SelectedRowKeys.selectedRowKeys ||
              SelectedRowKeys.selectedRowKeys.length === 'undefined' ||
              SelectedRowKeys.selectedRowKeys.length === 0
                ? '#e9e9e9'
                : 'black',
            display:
              !SelectedRowKeys.selectedRowKeys ||
              SelectedRowKeys.selectedRowKeys.length === 'undefined' ||
              SelectedRowKeys.selectedRowKeys.length === 0
                ? 'none'
                : 'block',
            cursor:
              !SelectedRowKeys.selectedRowKeys ||
              SelectedRowKeys.selectedRowKeys.length === 'undefined' ||
              SelectedRowKeys.selectedRowKeys.length === 0
                ? 'none'
                : 'pointer',
          }}
        />
      ),
      dataIndex: 'remove',
    },
  ];

  return (
    <>
      <AdminHeader />
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <AskRemoveModal
              title='리뷰 삭제'
              description='해당 리뷰를 정말 삭제하시겠습니까?'
              visible={Modal}
              onConfirm={() => onConfirm(SelectedRowKeys)}
              onCancel={onCancel}
            />
            <h1>Admin Reviews Page</h1>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default AdminReviews;
