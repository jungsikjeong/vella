import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { withRouter } from 'react-router';

import HeaderM from './sections/HeaderM';
import HeaderPC from './sections/HeaderPC';

const Header = ({ location: { pathname } }) => {
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  return (
    <>
      {isMobile ? (
        <HeaderM pathname={pathname} />
      ) : (
        <HeaderPC pathname={pathname} />
      )}
    </>
  );
};

export default withRouter(Header);
