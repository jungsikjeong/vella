/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react';
import { loadUser } from '../_actions/auth';
import { useSelector, useDispatch } from 'react-redux';

// null 누구나 들어갈 수 있음
// true 로그인 한 사용자 만 들어갈 수 있음
// false 로그인 한 사용자는 안으로 들어갈 수 없음.
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
      // 현재 상태를 확인하려고 Auth 요청을 보냄
      dispatch(loadUser());

      // 로그인되지 않은 상태
      if (!auth.isAuthenticated) {
        if (option) {
          if (adminRoute) {
            props.history.push('/admin');
            return;
          }
          props.history.push('/login');
          return;
        }
        // 로그인 상태
      } else {
        // 관리자 페이지에 관리자만 들어갈 수 있다.
        // 관리자가 아닐시, 관리자 로그인페이지로 이동
        if (adminRoute && auth.user.admin === null && !auth.user.admin) {
          props.history.push('/admin');
          return;
        } else {
          // 로그인한 유저는 접근할 수 없는 페이지
          if (option === false) {
            props.history.push('/');
            return;
          }
        }
      }
    }, []);

    return <SpecificComponent {...props} user={auth.user} />;
  }
  return AuthenticationCheck;
}
