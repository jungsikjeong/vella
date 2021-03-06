import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { register } from '../../_actions/auth';
import Helmet from 'react-helmet';

import Footer from '../Footer/Footer';

const Container = styled.div`
  @media (min-width: 800px) {
    padding-top: 6.5rem;
  }

  position: relative;
  margin: 0 auto;
  width: 100%;
  padding-top: 1.5rem;
`;

const Title = styled.div`
  @media (min-width: 800px) {
    margin: 2rem;
  }
  margin: 2rem 0 1rem;
  min-height: 30px;
  border-bottom: 0px solid #e8e8e8;
  h2 {
    text-align: center;
  }
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ButtonWrap = styled.div`
  margin: 20px auto 50px;
  text-align: center;
  width: 100%;
`;

const SButton = styled(Button)`
  width: 100%;
  /* padding: 0.5rem 6.5rem; */
  background: #fff;
  border: 1px solid #d5d5d5;
  height: 1.9rem;
  color: black;

  @media (min-width: 800px) {
    border: 1px solid #000;
    background-color: #000;
    color: #fff;
    width: 50%;
    transition: all 0.2s ease;

    :hover {
      border: 1px solid #000;
      background: #fff;
      color: #000;
    }
  }
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Join = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const emailRef = useRef();
  const nicknameRef = useRef();
  const passwordRef = useRef();

  const [FormData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    password2: '',
  });
  const [Term, setTerm] = useState(false);
  const [TermError, setTermError] = useState(false);

  const { email, nickname, password, password2 } = FormData;

  // ????????? email?????? ??????, ???????????? true??? ?????????
  function email_check(email) {
    var regex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    return email !== '' && email !== 'undefined' && regex.test(email);
  }

  const onChange = useCallback(
    (e) => {
      setFormData({ ...FormData, [e.target.name]: e.target.value });
    },
    [FormData]
  );

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      if (!email_check(email)) {
        return (
          alert('????????? ???????????? ??????????????????'),
          setFormData({ ...FormData, email: '' }),
          emailRef.current.focus()
        );
      }

      if (email.search(/\s/) !== -1) {
        return (
          alert('???????????? ????????? ??????????????????'),
          setFormData({ ...FormData, email: '' }),
          emailRef.current.focus()
        );
      }

      if (nickname === '') {
        return alert('???????????? ??????????????????'), nicknameRef.current.focus();
      }

      if (nickname.search(/\s/) !== -1) {
        return (
          alert('???????????? ????????? ????????????'),
          setFormData({ ...FormData, nickname: '' }),
          nicknameRef.current.focus()
        );
      }

      if (password === '') {
        return alert('??????????????? ??????????????????'), passwordRef.current.focus();
      }

      if (password !== password2) {
        return (
          alert('??????????????? ???????????? ????????????'),
          setFormData({ ...FormData, password: '', password2: '' }),
          passwordRef.current.focus()
        );
      }

      if (password.search(/\s/) !== -1 || password2.search(/\s/) !== -1) {
        return (
          alert('??????????????? ????????? ????????????'),
          setFormData({ ...FormData, password: '', password2: '' }),
          passwordRef.current.focus()
        );
      }

      if (!Term) {
        return setTermError(true);
      }

      dispatch(register({ nickname, email, password }));
    },
    [dispatch, FormData, email, nickname, password, password2, Term]
  );

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Container>
      <Helmet>
        <title>Vella | Join</title>
      </Helmet>
      <Title>
        <h2>?????? ??????</h2>
      </Title>

      {/* <h3>????????????</h3> */}
      <Contents>
        <Form
          {...formItemLayout}
          onFinish={onSubmit}
          // onSubmit={onSubmit}
          style={{ padding: 10 }}
        >
          <Form.Item label='?????????' required>
            <Input
              name='email'
              placeholder='admin@gmail.com'
              value={email}
              onChange={(e) => onChange(e)}
              ref={emailRef}
            />
          </Form.Item>

          <Form.Item
            label='?????????'
            tooltip='?????? ???????????? ????????? ??????????????? ????????? ?????????????'
            required
          >
            <Input
              name='nickname'
              value={nickname}
              onChange={(e) => onChange(e)}
              ref={nicknameRef}
            />
          </Form.Item>

          <Form.Item label='????????????' required hasFeedback>
            <Input.Password
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              ref={passwordRef}
            />
          </Form.Item>

          <Form.Item
            // name='password2'
            label='???????????? ??????'
            hasFeedback
            required
          >
            <Input.Password
              name='password2'
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Checkbox checked={Term} onChange={onChangeTerm}>
              ????????? ????????? ???????????????.
            </Checkbox>
            {TermError && (
              <div style={{ color: 'red' }}>????????? ??????????????? ?????????.</div>
            )}
          </Form.Item>

          {/* <Form.Item {...tailFormItemLayout} style={{ textAlign: 'center' }}> */}
          <ButtonWrap>
            <SButton type='primary' htmlType='submit'>
              ????????????
            </SButton>
          </ButtonWrap>
          {/* </Form.Item> */}
        </Form>
      </Contents>

      <Footer />
    </Container>
  );
};

export default Join;
