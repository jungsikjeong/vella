import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 998;
  transition: 0.5s;
`;

// 모바일 메뉴 버튼 클릭시 남은 여백화면 옅은 회색으로 변함

const Overally = () => {
  const MenuToggle = useSelector((state) => state.toggle.MenuToggle);

  return <>{MenuToggle && <Container />}</>;
};

export default Overally;
