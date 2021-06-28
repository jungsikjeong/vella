import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';

import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Container = styled.div`
  display: ${(props) => (props.current ? 'none' : 'block')};
  position: fixed;
  width: 100%;
  z-index: 999;
`;

const AdminHeader = ({ location: { pathname } }) => {
  return (
    <Container current={pathname === '/admin'}>
      <Menu mode='horizontal'>
        <Menu.Item key='mail'>
          <Link to='/admin/home'>Home</Link>
        </Menu.Item>

        <SubMenu key='SubMenu' icon={<SettingOutlined />} title='관리자 메뉴'>
          <MenuItemGroup title='상품관리'>
            <Link to='/admin/upload'>
              <Menu.Item key='setting:1'>상품 업로드</Menu.Item>
            </Link>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    </Container>
  );
};

export default withRouter(AdminHeader);
