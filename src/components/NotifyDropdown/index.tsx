import { useState, useEffect } from 'react';
import styles from './NotifyDropdown.module.scss';
import classNames from 'classnames/bind';
import { useAppSelector, useAppDispatch } from '~/app/store';
import { fetchActivityList } from '~/features/activitySlice';
import { formatTimeStampToTime, formatTimeStampToDate } from '~/util/date';
import { ActivityListType } from '~/types/Api';
import { Activity } from '../../types/Api';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

type NotifyProps = {
  openDrop?: boolean;
  className?: string;
};

const NotifyDropdown: React.FC<NotifyProps> = ({
  openDrop = false,
  className,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(openDrop);
  const dispatch = useAppDispatch();
  const activityData = useAppSelector((state) => state.activity.data);

  const moveToUserInfo = (): void => {
    navigate('/account-info');
  };

  const handleFetchData = (): void => {
    dispatch(fetchActivityList());
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notify-dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cx(
        'notify-dropdown',
        'wrapper',
        'position-relative',
        className,
      )}
    >
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="notify-icon cursor-pointer"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="16" fill="#FFF2E7" />
          <path
            d="M22.1167 18.0748L21.2833 16.6915C21.1083 16.3832 20.95 15.7998 20.95 15.4582V13.3498C20.95 11.3915 19.8 9.69984 18.1417 8.90817C17.7083 8.1415 16.9083 7.6665 15.9917 7.6665C15.0833 7.6665 14.2667 8.15817 13.8333 8.93317C12.2083 9.7415 11.0833 11.4165 11.0833 13.3498V15.4582C11.0833 15.7998 10.925 16.3832 10.75 16.6832L9.90833 18.0748C9.57499 18.6332 9.49999 19.2498 9.70833 19.8165C9.90833 20.3748 10.3833 20.8082 11 21.0165C12.6167 21.5665 14.3167 21.8332 16.0167 21.8332C17.7167 21.8332 19.4167 21.5665 21.0333 21.0248C21.6167 20.8332 22.0667 20.3915 22.2833 19.8165C22.5 19.2415 22.4417 18.6082 22.1167 18.0748Z"
            fill="#FFAC6A"
          />
          <path
            d="M18.3584 22.6748C18.0084 23.6415 17.0834 24.3332 16 24.3332C15.3417 24.3332 14.6917 24.0665 14.2334 23.5915C13.9667 23.3415 13.7667 23.0082 13.65 22.6665C13.7584 22.6832 13.8667 22.6915 13.9834 22.7082C14.175 22.7332 14.375 22.7582 14.575 22.7748C15.05 22.8165 15.5334 22.8415 16.0167 22.8415C16.4917 22.8415 16.9667 22.8165 17.4334 22.7748C17.6084 22.7582 17.7834 22.7498 17.95 22.7248C18.0834 22.7082 18.2167 22.6915 18.3584 22.6748Z"
            fill="#FFAC6A"
          />
        </svg>
      </div>
      <div onClick={moveToUserInfo} className={cx('user', 'pointer')}>
        <img
          className={cx('avatar')}
          alt=""
          src="https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.6435-9/97422931_1091843461182849_8761038478390591488_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=174925&_nc_ohc=Ya8zN8H3lNoAX-OWjGI&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfBtarzsjs8fxnbvtiWUWBO44vhzzGm8jotOuProiMcmfg&oe=648A1E8D"
        />
        <div className={cx('info')}>
          <p>Xin chào</p>
          <h2>Ngô Minh Khôi</h2>
        </div>
      </div>
      <div
        className={cx('dropdown', 'shadow', {
          close: isOpen !== true,
          open: isOpen === true,
        })}
      >
        <div
          className={cx(
            'heading',
            'px-3',
            'py-2',
            'text-white',
            'fs-2',
            'fw-bold',
          )}
        >
          Thông báo
        </div>
        <ul className={cx('content', 'p-3')}>
          {activityData.map((content, index) => {
            return (
              <li key={index} style={{ color: '#BF5805' }} className="mb-3">
                <h4>Người dùng: {content.data.username}</h4>
                <p className="text-muted">
                  Thời gian nhận lần cuối:{' '}
                  <span>
                    {formatTimeStampToTime(
                      content.data.logged_time.seconds,
                      'HH:mm',
                    )}
                  </span>{' '}
                  ngày{' '}
                  <span>
                    {formatTimeStampToDate(
                      content.data.logged_time.seconds,
                      'DD-MM-YYYY',
                    )}
                  </span>
                </p>
                <div className="border my-2"></div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NotifyDropdown;
