import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { withRouter } from 'react-router';
import Loading from '../Common/Loading';

import HeaderM from './sections/HeaderM';
import HeaderPC from './sections/HeaderPC';

const Header = ({ location: { pathname } }) => {
  const { user, loading } = useSelector(({ auth }) => ({
    user: auth.user,
    loading: auth.loading,
  }));

  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isMobile ? (
            <HeaderM pathname={pathname} user={user && user} />
          ) : (
            <HeaderPC pathname={pathname} user={user && user} />
          )}
        </>
      )}
    </>
  );
};

export default withRouter(Header);
