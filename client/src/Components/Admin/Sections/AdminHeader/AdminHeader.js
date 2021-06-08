import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';

import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const AdminHeader = () => {
  return (
    <>
      <Menu mode='horizontal'>
        <Menu.Item key='mail'>
          <Link to='/admin'>Home</Link>
        </Menu.Item>

        <SubMenu key='SubMenu' icon={<SettingOutlined />} title='관리자 메뉴'>
          <MenuItemGroup title='상품관리'>
            <Link to='/admin/upload'>
              <Menu.Item key='setting:1'>상품 업로드</Menu.Item>
            </Link>

            <Menu.Item key='setting:2'>상품 수정 및 삭제</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title='고객관리'>
            <Menu.Item key='setting:3'>리뷰관리</Menu.Item>
            {/* <Menu.Item key='setting:4'>고객정보</Menu.Item> */}
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    </>
  );
};

export default AdminHeader;
