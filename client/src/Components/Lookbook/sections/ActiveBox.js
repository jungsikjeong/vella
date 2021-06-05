import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const boxIn = keyframes`
0%{
    opacity: 0;
}
100%{
    opacity: 1;
}
`;

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  animation: ${boxIn} 350ms ease-out;

  display: none;
  opacity: 0;

  &.toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
  }

  img {
    width: auto;
    max-height: 95%;
  }
`;
const ActiveBox = ({ imgSrc, Toggle, onToggle }) => {
  const closeRef = useRef();

  const onClickOutside = ({ target }) => {
    if (Toggle && closeRef && !closeRef.current.contains(target)) onToggle();
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutside);
    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <Container
      className={Toggle && 'toggle'}
      onClick={(e) => onClickOutside(e)}
    >
      <img src={imgSrc ? imgSrc : ''} alt='' ref={closeRef} />
    </Container>
  );
};

export default ActiveBox;
