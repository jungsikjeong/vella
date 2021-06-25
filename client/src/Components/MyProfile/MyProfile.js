import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Responsive from '../Common/Responsive';

const Container = styled(Responsive)``;

const MyProfile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);

  return <Container>MyProfile</Container>;
};

export default MyProfile;
