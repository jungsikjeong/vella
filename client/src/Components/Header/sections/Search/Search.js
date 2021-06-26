import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { searchProduct } from '../../../../_actions/product';

const blinkEffect = keyframes`
  50% {
    opacity: 0;
  }
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: block;
  background: rgba(255, 255, 255, 0.9);

  left: -100%;
  opacity: 0;

  padding-top: 12.5rem;
  cursor: crosshair;
  text-align: center;
  font-weight: 700;
  font-size: 0.8rem;
  transition: transform 0.5s, opacity 0.5s, left 0s 0.5s;

  &.openSearch {
    left: 0;
    opacity: 1;
    transform: scale(1) translate3d(0, 0, 0);
    transition: transform 0.5s, opacity 0.5s, left 0s 0s;
  }
`;

const SearchWrap = styled.div`
  input {
    width: 30%;
    top: 0;
    left: 0;
    z-index: 999;
    padding: 0px 0;
    border: none;
    color: #353535;
    border-bottom: 1px solid gray;
    outline: none;
    font-size: 2rem;
    background: none !important;
    height: 3rem !important;
    line-height: 48px;
  }
`;

const Text = styled.div`
  padding: 0.25rem;
  color: #000;
`;

const Message = styled.div`
  margin-top: 0.5rem;
  animation: ${blinkEffect} 1s step-end 3;
`;

const Search = ({ onOpenSearch, OpenSearch, history }) => {
  const CloseRef = useRef();
  const dispatch = useDispatch();

  const [SearchValue, setSearchValue] = useState('');
  const [NotResult, setNotResult] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!SearchValue) {
        return alert('검색어를 입력해주세요');
      }
      let body = {
        searchTerm: SearchValue,
      };

      // 검색 결과가 없으면 에러메시지 송출
      dispatch(searchProduct({ body, history })).then((res) => {
        if (res.length === 0) {
          return setNotResult(true);
        }
        if (res.length > 0) {
          setNotResult(false);
          return onOpenSearch();
        }
      });
    },
    [dispatch, history, SearchValue, onOpenSearch]
  );

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickOutside = ({ target }) => {
    if (OpenSearch && !CloseRef.current.contains(target)) {
      setSearchValue('');
      onOpenSearch();
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutside);
    return () => {
      window.removeEventListener('click', onClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className={OpenSearch && 'openSearch'} onClick={onClickOutside}>
      <SearchWrap>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            ref={CloseRef}
            value={SearchValue}
            onChange={(e) => onChangeSearch(e)}
          />
        </form>
      </SearchWrap>
      <Text>Press Enter to Search</Text>

      {NotResult && (
        <Message>
          <Text>No results were found for your search.</Text>
        </Message>
      )}
    </Container>
  );
};

export default withRouter(Search);
