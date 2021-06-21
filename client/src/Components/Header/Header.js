import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { withRouter } from 'react-router';

import HeaderM from './sections/HeaderM';
import HeaderPC from './sections/HeaderPC';

const Header = ({ location: { pathname } }) => {
  const auth = useSelector((state) => state.auth);

  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  return (
    <>
      {isMobile ? (
        <HeaderM pathname={pathname} user={auth.user} />
      ) : (
        <HeaderPC pathname={pathname} user={auth.user} />
      )}
    </>
  );
};

export default withRouter(Header);
