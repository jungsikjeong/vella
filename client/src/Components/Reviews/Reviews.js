import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';
import Responsive from '../Common/Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../../_actions/review';

import Loading from '../Common/Loading';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const Container = styled(Responsive)`
  /* margin-top: 2rem; */

  .page-title {
    font-size: 0.6rem;
    font-weight: bold;
    text-align: center;
    padding: 2rem;
    /* margin-bottom: 2rem; */
  }
`;

const Table = styled.table`
  width: 100%;
  border-top-color: #afafaf;
  font-size: 0.55rem;
  border-top: 1px solid #d7d5d5;
  border-bottom: 1px solid #f1f1f1;
  line-height: 1.5;
  margin: 0 auto;
  thead {
    th {
      padding: 0.3rem 0 0.4rem;
    }
  }
`;

const Tbody = styled.tbody`
  text-align: center;
  border-top: 1px solid #d7d5d5;

  tr {
  }
  td {
    vertical-align: middle;
    padding: 0.3rem 0 0.4rem;
  }

  img {
    width: 46px;
    text-align: center;
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
 * 전체 리뷰를 보여주는 페이지
 */
const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(({ review }) => ({
    reviews: review.reviews,
    loading: review.loading,
    error: review.error,
  }));
  let i = 0;

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
            <Link to={`/review/${review._id}`}>{review.title}</Link>
          </td>
          <td>{review.user.nickname}</td>
          <td>{review.date.substring(0, 10)}</td>
          <td>{/* hit 조회수 */}0</td>
        </tr>
      ))}
    </>
  );

  return (
    <>
      <Container>
        <h1 className='page-title'>Reviews</h1>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Table>
              <colgroup>
                <col style={{ width: '70px' }}></col>
                <col style={{ width: '80px' }}></col>
                <col style={{ width: 'auto' }}></col>
                <col style={{ width: '100px' }}></col>
                <col style={{ width: '100px' }}></col>
                <col style={{ width: '80px' }}></col>
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

export default Reviews;
