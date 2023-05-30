/** @format */

import { Fragment } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import { pathType } from '~/types/Header';
import NotifyDropdown from '~/components/NotifyDropdown';
const cx = classNames.bind(styles);

interface HeaderProps {
  path?: pathType[];
  openDrop?: boolean;
}

const Header: React.FC<HeaderProps> = ({ path, openDrop }) => {
  return (
    <>
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
            <NotifyDropdown openDrop={openDrop} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
