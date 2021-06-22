import React from 'react';
import { Link } from 'react-router-dom';
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

const UserCardBlock = ({ products, removeItem, cart }) => {
  const renderItems = ({ cart }) => (
    <>
      {cart.map((item) => (
        <tr key={item.id}>
          <td>
            <Link to={`/product/${item.id}`}>
              <img
                alt='product'
                src={`http://localhost:5000/${item.images[0]}`}
              />
            </Link>
          </td>
          <td>{item.title}</td>
          <td>{item.price}</td>
          <td>{item.quantity}</td>

          <td>
            <button>delete</button>
          </td>
        </tr>
      ))}
    </>
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

        <Tbody>{renderItems({ cart })}</Tbody>
      </Table>
    </Container>
  );
};

export default UserCardBlock;
