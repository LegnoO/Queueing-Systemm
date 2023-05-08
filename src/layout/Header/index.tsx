/** @format */

import { Fragment } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { pathType } from '~/types/Header';
const cx = classNames.bind(styles);

interface HeaderProps {
  path?: pathType[];
}

const Header: React.FC<HeaderProps> = ({ path }) => {


  return (
    <div className={cx('wrapper')}>
      <div className={cx('left')}>
        <div className={cx('content-breadcrumbs')}>
          {path?.map((value: pathType, index: number) => {
            return (
              <Fragment key={index}>
                <Button
                  to={value.to}
                  className={cx('title', { 'link-button': value.to })}
                >
                  {value.text}
                </Button>
                {index + 1 < path?.length ? (
                  <span key={index} className={cx('arrow')}>
                    <NavigateNextIcon fontSize="small" />
                  </span>
                ) : (
                  <></>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className={cx('right')}>
        <div className={cx('inner')}>
          <div className={cx('notify-icon')}>
            <NotificationsIcon />
          </div>
          <div className={cx('user')}>
            <img
              className={cx('avatar')}
              alt=""
              src="https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.6435-9/97422931_1091843461182849_8761038478390591488_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=174925&_nc_ohc=6IT_5Ffje2oAX8EW5wC&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfAYbuqXO_-ueOKUxh0mUxuBh49fZJfMraslrzdYvaqgiw&oe=6462594D"
            />
            <div className={cx('info')}>
              <p>Xin chào</p>
              <h2>Ngô Minh Khôi</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
