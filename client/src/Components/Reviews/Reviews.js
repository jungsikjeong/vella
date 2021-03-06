import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';
import Responsive from '../Common/Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../../_actions/review';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useMediaQuery } from 'react-responsive';

import Loading from '../Common/Loading';
import Footer from '../Footer/Footer';

const Container = styled(Responsive)`
  text-align: center;
  .page-title {
    font-weight: bold;
    padding: 2rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-top-color: #afafaf;
  font-size: 0.55rem;
  border-top: 1px solid #d7d5d5;
  /* border-bottom: 1px solid #f1f1f1; */
  line-height: 1.5;
  margin: 0 auto;
  thead {
    th {
      padding: 0.3rem 0.5rem 0.4rem;
    }
  }
`;

const Tbody = styled.tbody`
  text-align: center;
  border-top: 1px solid #d7d5d5;

  tr {
    border-bottom: 1px solid #f1f1f1;
  }
  td {
    vertical-align: middle;
    padding: 0.3rem 0 0.4rem;
    text-overflow: ellipsis;

    @media (min-width: 800px) {
    }
  }

  img {
    width: 46px;
    text-align: center;
    @media (min-width: 800px) {
      width: 100%;
    }
  }
`;

const Page = styled.div`
  padding: 1rem;
  text-align: center;
`;

const SPagination = styled(Pagination)`
  li {
    border: none;

    &.ant-pagination-item-active a {
      color: #000000;
    }
  }
`;

const ButtonWrap = styled.div`
  font-size: 0.55rem;
  text-align: center;
  margin-right: 19rem;

  button {
    letter-spacing: 1px;
    margin: 0.2rem 0rem;
    padding: 0.15rem 0.5rem;
    background: 0 0;
    outline: none;
    border: 1px solid #bbb;
    cursor: pointer;
  }
`;

const NotPost = styled.div`
  display: flex;
  padding: 5rem 0 0;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #555555;
`;

/**
 *
 * 모든 리뷰를 보여주는 페이지 (다른 사용자들이 남긴 리뷰도 볼 수 있는 페이지)
 */
const ReviewListPage = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(({ review }) => ({
    reviews: review.reviews,
    loading: review.loading,
    error: review.error,
  }));
  let i = 0;

  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  if (error.msg === 404) {
    return (
      <>
        <NotPost>작성된 리뷰가 없습니다..</NotPost>
        <Footer />
      </>
    );
  }

  const renderItems = () => (
    <>
      {reviews.map((review) => (
        <tr key={review._id}>
          <td>{i++}</td>
          <td>
            <Link to={`/review/${review._id}`}>
              <img src={review.images[0]} alt='' />
            </Link>
          </td>
          <td>
            {isMobile ? (
              <Link to={`/review/${review._id}`}>
                {review.title.length > 7
                  ? `${review.title.substring(0, 6)}..`
                  : review.title}
              </Link>
            ) : (
              <Link to={`/review/${review._id}`}>{review.title}</Link>
            )}
          </td>
          <td>{review.user.nickname}</td>
          <td>{review.date.substring(0, 10)}</td>
          <td>{review.views}</td>
        </tr>
      ))}
    </>
  );

  return (
    <>
      <Helmet>
        <title>Vella | Reviews</title>
      </Helmet>
      <Container>
        <h1 className='page-title'>All reviews</h1>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Table>
              <colgroup>
                <col style={{ width: '30px' }}></col>
                <col style={{ width: '80px' }}></col>
                <col style={{ width: 'auto' }}></col>
                <col style={{ width: '50px' }}></col>
                <col style={{ width: '80px' }}></col>
                <col style={{ width: '30px' }}></col>
              </colgroup>

              <thead>
                <tr>
                  <th scope='col'>no</th>
                  <th scope='col'>product</th>
                  <th scope='col'>title</th>
                  <th scope='col'>writer</th>
                  <th scope='col'>date</th>
                  <th scope='col'>hit</th>
                </tr>
              </thead>

              <Tbody>{renderItems()}</Tbody>
            </Table>

            <Page>
              <SPagination size='small' total={reviews.length} />
            </Page>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ReviewListPage;
