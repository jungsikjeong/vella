import React from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';

const Table = styled.table`
  /* width: 100%; */
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

const Review = () => {
  const renderItems = () => (
    // To do:: 링크걸어서 해당 리뷰로 이동하게끔 해줄것
    <tr>
      <td>{/* no */}1</td>
      <td>시원시원한 원피스</td>
      <td>정중식</td>
      <td>2021-06-16</td>
      <td>{/* hit 조회수 */}0</td>
    </tr>
  );

  return (
    <>
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
        <button>write</button>
      </ButtonWrap>

      <Page>
        <SPagination size='small' total={50} />
      </Page>
    </>
  );
};

export default Review;
