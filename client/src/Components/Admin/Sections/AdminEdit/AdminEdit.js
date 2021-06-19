import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  readProduct,
  clearProduct,
  productPostEdit,
} from '../../../../_actions/product';
import { withRouter } from 'react-router';
import { categories } from '../../../../utils/categories';
import Quill from 'quill';

// components
import Responsive from '../../../Common/Responsive';
import AdminHeader from '../AdminHeader/AdminHeader';
import EditFileUpload from './sections/EditFileUpload';
import AskModal from '../../../Common/AskModal/AskModal';
import Loading from '../../../Common/Loading';

const Container = styled(Responsive)`
  .page-title {
    text-align: center;
    padding: 1rem;
    margin-bottom: 2rem;
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

const AdminEdit = ({ history, match }) => {
  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스를 설정

  const { id } = match.params;
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);

  const [FormData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
  });
  const [Description, setDescription] = useState('');
  const [Modal, setModal] = useState(false);

  const { title, price, category } = FormData;

  const onChange = useCallback(
    (e) => {
      setFormData({ ...FormData, [e.target.name]: e.target.value });
      mounted.current = true;
    },
    [FormData]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!title || !Description || !price || !product.images || !category) {
        alert('빈 칸을 모두 채워주세요');
        return;
      }
      if (!product.images) {
        alert('이미지를 업로드해주세요');
        return;
      }

      const images = product.images;

      const body = {
        title,
        description: Description,
        price,
        images,
        category,
      };

      dispatch(productPostEdit({ body, id, history }));
    },
    [title, Description, price, category, product, dispatch, history, id]
  );

  const onRemoveClick = () => {
    setModal(true);
  };

  // 모달창에서 확인 누르면 데이터 사라지고 관리자 홈 화면으로 이동
  const onConfirm = () => {
    setModal(false);
    dispatch(clearProduct());
    history.push('/admin/home');
  };

  // 모달창에서 취소 누르면 다시 업로드페이지로 돌아감
  const onCancel = () => {
    setModal(false);
  };

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      placeholder: '내용을 작성하세요',
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

  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;

    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        category: product.categories,
      });
      quillInstance.current.root.innerHTML = product.description;
    }
  }, [product]);

  useEffect(() => {
    dispatch(readProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <AdminHeader />
          <Container>
            <AskModal
              title={'취소하시겠습니까?'}
              description={'수정했던 데이터들이 취소될 수 있습니다.'}
              visible={Modal}
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
            <h1 className='page-title'>쇼핑몰 상품 업로드</h1>
            <SForm onFinish={onSubmit}>
              {/* 파일 업로드 */}
              <EditFileUpload />
              <br />
              <select onChange={(e) => onChange(e)} name='category'>
                {categories.map((item) => (
                  <option
                    key={item.key}
                    value={item.key}
                    // 불러온 데이터의 카테고리 기본값 설정
                    selected={
                      category && category === item.key ? 'selected' : ''
                    }
                  >
                    {item.value}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <label>상품 이름</label>
              <Input onChange={(e) => onChange(e)} value={title} name='title' />
              <br />
              <br />
              <label>상품 설명</label>
              <QuillWrapper>
                <div ref={quillElement} />
              </QuillWrapper>
              <br />
              <br />
              <label>상품 가격($)</label>
              <Input
                type='number'
                onChange={(e) => onChange(e)}
                value={price}
                name='price'
              />
              <br />
            </SForm>
            <br />

            <ButtonWrap>
              <SButton type='submit' onClick={onSubmit}>
                확인
              </SButton>

              <SButton className='cancel-btb' onClick={onRemoveClick}>
                취소
              </SButton>
            </ButtonWrap>
          </Container>
        </>
      )}
    </>
  );
};

export default withRouter(AdminEdit);
