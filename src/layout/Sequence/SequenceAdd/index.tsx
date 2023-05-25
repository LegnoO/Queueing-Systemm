import React from 'react';
import Header from '~/layout/Header';
import styles from './SequenceAdd.module.scss';
import classNames from 'classnames/bind';
import { pathType } from '~/types/Header';
const cx = classNames.bind(styles);

const SequenceAdd = () => {
  const CONTENT_TITLES: pathType[] = [
    { text: 'cấp số' },
    { text: 'Danh sách cấp số', to: '/sequence-list' },
    { text: 'Chi tiết' },
  ];

  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div>
        <h3 className={cx('header-title')}>Quản lý dịch vụ</h3>
        <div className={cx('content')}>
          <div className={cx('form-container')}>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default SequenceAdd;
