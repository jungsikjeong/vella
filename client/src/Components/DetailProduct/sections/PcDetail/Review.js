import React from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

const Container = styled.div``;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 742.125px;
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

  td {
    padding: 0.3rem 0 0.4rem;
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
  display: flex;
  justify-content: flex-start;
  font-size: 0.55rem;
  text-align: center;

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

const Review = ({ id, reviews }) => {
  let i = 1;

  const renderItems = () => (
    <>
      {reviews.map((review) => (
        <tr key={review._id}>
          <td>{i++}</td>
          <td>
            <Link to={`/review/${review._id}`}>
              {/* {review.title} */}
              {review.title.length > 20
                ? `${review.title.substring(0, 15)}...`
                : review.title}
            </Link>
          </td>
          <td>{review.user.nickname}</td>
          <td>{review.date.substring(0, 10)}</td>
          <td>{review.views}</td>
        </tr>
      ))}
    </>
  );

  return (
    <Container>
      <Wrapper>
        <Table>
          <colgroup>
            <col style={{ width: '70px' }}></col>
            <col style={{ width: 'auto' }}></col>
            <col style={{ width: '100px' }}></col>
            <col style={{ width: '100px' }}></col>
            <col style={{ width: '80px' }}></col>
          </colgroup>

          <thead>
            <tr>
              <th scope='col'>no</th>
              <th scope='col'>title</th>
              <th scope='col'>writer</th>
              <th scope='col'>date</th>
              <th scope='col'>hit</th>
            </tr>
          </thead>

          <Tbody>{renderItems()}</Tbody>
        </Table>

        <ButtonWrap>
          <Link to={`/product/review/${id}`}>
            <button>write</button>
          </Link>
        </ButtonWrap>
      </Wrapper>

      <Page>
        <SPagination size='small' total={reviews.length} />
      </Page>
    </Container>
  );
};

export default Review;
