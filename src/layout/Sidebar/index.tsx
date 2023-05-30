/** @format */

import { images } from '~/assets/images';
import styles from './Sidebar.module.scss';
import Button from '~/components/Button';
import { Link, useLocation } from 'react-router-dom';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { cleanData } from '~/features/accountSlice';
import { useAppDispatch } from '~/app/store';
import { Subtitles } from '@mui/icons-material';

const cx = classNames.bind(styles);

interface ButtonMenuProps {
  title: string;
  subTitle?: { title: string; to?: string }[] | undefined;
  to?: string;
  menu?: React.ReactElement;
  endIcon?: React.ReactElement;
}

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const location = useLocation();


  const subTitle = [
    { title: 'Quản lý vai trò', to: '/role-list' },
    { title: 'Quản lý tài khoản', to: '/account-list' },
    { title: 'Nhật ký người dùng', to: '/activity' },
  ];

  const BUTTON_MENU: ButtonMenuProps[] = [
    {
      title: 'Dashboard',
      to: '/',
    },
    { title: 'Thiết bị', to: '/device-list' },
    { title: 'Dịch vụ', to: '/service-list' },
    { title: 'Cấp số', to: '/sequence-list' },
    { title: 'Báo cáo', to: '/report-list' },
    {
      title: 'Cài đặt hệ thống',
      subTitle: subTitle,

      endIcon: (
        <div className={cx('d-flex', 'dropdown-icon')}>
          <MoreVertIcon />
          <div className={cx('dropdown-menu')}>
            <ul className="d-flex flex-column">
              {subTitle.map((value, index) => {
                return (
                  <Link key={index} to={value.to}>
                    <li
                      className={cx('button_menu', 'button_menu-dropdown', {
                        active: location.pathname === value.to,
                      })}
                    >
                      {value.title}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <header className={cx('wrapper')}>
        <div className={cx('logo')}>
          <Button to="/">
            <img
              alt="logo"
              src={images.logo}
              style={{ width: '80px', height: '64px' }}
            />
          </Button>
        </div>
        <div className={cx('content')}>
          {BUTTON_MENU.map((value, index) => {
            return (
              <Button
                to={value.to}
                startIcon={<MoreTimeIcon />}
                endIcon={value.endIcon}
                className={cx(
                  'button_menu',
                  {
                    active: location.pathname === value.to,
                  },
                  {
                    last_button: subTitle.some((item) =>
                      location.pathname.includes(item.to),
                    ),
                  },
                )}
                key={index}
              >
                {value.title}
                {value.menu}
              </Button>
            );
          })}
        </div>
        <div className={cx('bottom')}>
          <Button to="/login" startIcon={<MoreTimeIcon />} className={cx('button_logout')}>
            Đăng xuất
          </Button>
        </div>
      </header>
    </>
  );
};

export default Sidebar;
