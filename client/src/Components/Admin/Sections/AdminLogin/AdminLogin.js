import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { adminLogin } from '../../../../_actions/auth';
import Helmet from 'react-helmet';

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  padding-top: 5rem;
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
    font-weight: 700;
    text-transform: uppercase;
    color: #333;
  }
`;

const Form = styled.form`
  border: 0px solid #d7d5d5;
  margin-bottom: 0.15rem;
  padding: 1.5rem 0;
  color: #2e2e2e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .label {
    font-size: 0.7rem;
    padding: 0.6rem 0px 0.4rem;
  }

  .link {
    position: relative;
    padding: 1.25rem 0 0 0px;
    color: #757575;
    border-top: 0px solid #000;
    text-align: center;
  }

  span {
    color: #000000;
    font-weight: bold;
    border-bottom: 1px solid #000;
  }

  ul {
    display: flex;
    overflow: hidden;
    padding: 0.6rem 0;
    margin: 0;
    border: 0;
    text-align: center;

    li:nth-child(1) {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }

    li:nth-child(2) {
      padding-left: 0rem;
      padding-right: 0.75rem;
    }
  }
`;

const FormContents = styled.div``;

const Input = styled.input`
  overflow: hidden;
  margin: 0 0 0.1rem;
  border: 1px solid #000;
  border-radius: 2px;
  font-size: 0.8rem;
  color: #8f8f91;
  padding: 0.2rem 0.5rem;
`;

const SLink = styled(Link)`
  font-size: 0.6rem;
`;

const Button = styled.button`
  border: 1px solid #000;
  background-color: #000;
  color: #fff;
  width: 5rem;
  border: 1px solid #d5d5d5;
  padding: 0.25rem 0;
  margin: 0.2rem auto;
  text-transform: uppercase;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  :hover {
    border: 1px solid #000;
    background: #fff;
    color: #000;
  }
`;

const AdminLogin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(adminLogin(email, password));
  };

  if (user && user !== null && user.admin) {
    return <Redirect to='/admin/home' />;
  }

  return (
    <Container>
      <Helmet>
        <title>Vella | Admin</title>
      </Helmet>
      <Title>
        <h2>????????? ?????????</h2>
      </Title>

      <Form onSubmit={onSubmit}>
        <FormContents>
          <p className='label'>?????????</p>
          <Input name='email' value={email} onChange={(e) => onChange(e)} />

          <p className='label'>????????????</p>
          <Input
            name='password'
            type='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </FormContents>

        <ul>
          <li>
            <SLink to='#'>ID??? ????????????????</SLink>
          </li>
          <li>
            <SLink to='#'>??????????????? ????????????????</SLink>
          </li>
        </ul>

        <Button>login</Button>

        <p className='link'>
          <SLink to='/'>
            ???????????? ???????????????? <span>?????? ????????????????????????</span>
          </SLink>
        </p>
      </Form>
    </Container>
  );
};

export default AdminLogin;
