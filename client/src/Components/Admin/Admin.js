import React from 'react';
import { useMediaQuery } from 'react-responsive';

// components
import AdminHeader from './Sections/AdminHeader/AdminHeader';
import AdminHome from './Sections/AdminHome/AdminHome';

const Admin = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  return (
    <>
      <AdminHeader />
      <AdminHome />
    </>
  );
};

export default Admin;
