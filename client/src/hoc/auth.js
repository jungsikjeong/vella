/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { loadUser } from '../_actions/auth';
import { useSelector, useDispatch } from 'react-redux';

// null 누구나 들어갈 수 있음
// true 로그인 한 사용자 만 들어갈 수 있음
// false 로그인 한 사용자는 안으로 들어갈 수 없음

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    let user = useSelector((state) => state.auth);

    useEffect(() => {
      dispatch(loadUser()).then((response) => {
        console.log('response', response);

        //로그인 되지 않았다면 어드민 로그인 페이지로 돌려보냄
        if (!response) {
          props.history.push('/admin');
        } else if (adminRoute && response && !response.admin) {
          props.history.push('/admin');
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
