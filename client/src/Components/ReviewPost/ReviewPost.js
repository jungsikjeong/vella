import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { clearReview, reviewPostUpload } from '../../_actions/review';
import Quill from 'quill';

// components
import Responsive from '../Common/Responsive';

const Container = styled(Responsive)`
  text-align: left;
  .page-title {
    text-align: center;
    padding: 2rem;
    /* margin-bottom: 2rem; */
  }
`;
const SForm = styled(Form)`
  padding: 0 1rem;
`;

const ButtonWrap = styled.div`
  padding-bottom: 1rem;
`;

const SButton = styled(Button)`
  margin-left: 1rem;

  &.cancel-btb {
    :hover {
      color: red;
      border-color: red;
    }
  }
`;

const QuillWrapper = styled.div`
  /* 최소 크기 지정 및 padding 제거 */
  .ql-editor {
    border: 2px solid #d9d9d9;
    padding: 0;
    min-height: 120px;
    font-size: 0.89rem;
    line-height: 1.5;
    transition: all 0.3s;
    :focus {
      border-color: #9fd4ff;
    }
    :hover {
      border-color: #9fd4ff;
    }
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;

const ReviewPost = ({ history, match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();

  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스를 설정

  const { isAuthenticated } = useSelector(({ auth }) => ({
    isAuthenticated: auth.isAuthenticated,
  }));

  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!Title || !Description) {
        alert('빈 칸을 모두 채워주세요');
        return;
      }

      const body = {
        title: Title,
        description: Description,
        productId: id,
      };

      dispatch(reviewPostUpload({ body, history }));
    },
    [Title, Description, dispatch, history, id]
  );

  const onCancel = () => {
    dispatch(clearReview());
    history.goBack();
  };

  const onChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      modules: {
        // 더 많은 옵션
        // https://quilljs.com/docs/modules/toolbar/ 참고
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link'],
        ],
      },
    });

    // quill에 text-change 이벤트 핸들러 등록
    // 참고: https://quilljs.com/docs/api/#events
    const quill = quillInstance.current;
    if (
      quill.on === undefined ||
      !quill ||
      quill === null ||
      quill.on === null ||
      !quill.on
    ) {
      return;
    }
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        setDescription(quill.root.innerHTML);
      }
    });
  }, [setDescription]);

  useEffect(() => {
    return () => {
      dispatch(clearReview());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      // eslint-disable-next-line no-sequences
      return alert('로그인이 필요합니다.'), history.push('/login');
    }
  }, [isAuthenticated, history]);
  return (
    <>
      <Container>
        <h1 className='page-title'>Write a review</h1>
        <SForm onFinish={onSubmit}>
          <br />
          <label>리뷰 제목</label>
          <Input onChange={(e) => onChange(e)} value={Title} name='title' />
          <br />
          <br />
          <label>리뷰 내용</label>
          <QuillWrapper>
            <div ref={quillElement} />
          </QuillWrapper>

          <br />
        </SForm>
        <br />

        <ButtonWrap>
          <SButton type='submit' onClick={onSubmit}>
            확인
          </SButton>

          <SButton className='cancel-btb' onClick={onCancel}>
            취소
          </SButton>
        </ButtonWrap>
      </Container>
    </>
  );
};

export default withRouter(ReviewPost);
