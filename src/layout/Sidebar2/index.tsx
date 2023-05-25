/** @format */

import { images } from '~/assets/images';
import styles from './Sidebar.module.scss';
import Button from '~/components/Button';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ButtonMenuProps {
  title: string;
  to?: string;
  menu?: React.ReactElement;
  endIcon?: React.ReactElement;
}

const Sidebar = () => {
  const [isActive, setIsActive] = useState<number | null>(null);

  const handleClick = (id: number): void => {
    setIsActive(id);
  };

  const BUTTON_MENU: ButtonMenuProps[] = [
    {
      title: 'Dashboard',
    },
    { title: 'Thiết bị', to: '/device-list' },
    { title: 'Dịch vụ', to: '/service-list' },
    { title: 'Cấp số' },
    { title: 'Báo cáo' },
    {
      title: 'Cài đặt hệ thống',
      endIcon: (
        <div className={cx('d-flex', 'dropdown-icon')}>
          <MoreVertIcon />
          <div className={cx('dropdown-menu')}>
            <ul className="d-flex flex-column">
              <li>Quản lý vai trò</li>
              <li>Quản lý tài khoản</li>
              <li>Nhật ký người dùng</li>
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
                onClick={() => handleClick(index)}
                startIcon={<MoreTimeIcon />}
                endIcon={value.endIcon}
                className={cx('button_menu', { active: index === isActive })}
                key={index}
              >
                {value.title}
                {value.menu}
              </Button>
            );
          })}
        </div>
        <div className={cx('bottom')}>
          <Button startIcon={<MoreTimeIcon />} className={cx('button_logout')}>
            Đăng xuất
          </Button>
        </div>
      </header>
    </>
  );
};

export default Sidebar;
