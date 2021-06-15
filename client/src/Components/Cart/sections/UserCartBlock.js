import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 0.65rem;

  tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #dddddd;
    border-bottom: 0px;

    &tr:nth-child(even) {
      background-color: #dddddd;
    }
  }

  th {
    padding: 0.4rem;
    width: 100%;
  }
`;

const Tbody = styled.tbody`
  img {
    max-width: 4rem;
  }

  tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #dddddd;
  }

  td {
    width: 100%;
    height: 100%;
    text-align: center;

    padding: 0.4rem;

    button {
      cursor: pointer;
      letter-spacing: 1px;
      background: #fff;
      border: 1px solid #000;
      color: #000;
      padding: 0.15rem 1rem;
      display: block;
      text-align: center;
      margin: 0 auto;
    }
  }
`;

const UserCardBlock = ({ products, removeItem }) => {
  //   const renderCartImage = (images) => {
  //     if (images.length > 0) {
  //       let image = images[0];
  //       return `http://localhost:5000/${image}`;
  //     }
  //   };

  const renderItems = () => (
    // To do:: 링크걸어서 해당 상품으로 이동하게끔 해줄것
    <tr>
      <td>
        <img
          alt='product'
          src='https://nueahmik.com/web/product/tiny/202010/7712cb38e7b68324c7c6284a80199322.jpg'
        />
      </td>
      <td>VIIR 텐셀 옥스퍼드 랩 스커트</td>
      <td>19200원</td>
      <td>1개</td>

      <td>
        <button>delete</button>
      </td>
    </tr>
  );
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>이미지</th>
            <th>상품정보</th>
            <th>판매가</th>
            <th>수량</th>
            <th>삭제</th>
          </tr>
        </thead>

        <Tbody>{renderItems()}</Tbody>
      </Table>
    </Container>
  );
};

export default UserCardBlock;
