/** @format */

import { images } from '~/assets/images';
import styles from './Sidebar.module.scss';
import Button from '~/components/Button';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { useState } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ButtonMenuProps {
  title: string;
  to?: string;
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
    { title: 'Cài đặt hệ thống' },
  ];

  return (
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
              className={cx('button_menu', { active: index === isActive })}
              key={index}
            >
              {value.title}
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
  );
};

export default Sidebar;
