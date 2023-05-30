import React from 'react';
import Header from '~/layout/Header';
import styles from './SequenceAdd.module.scss';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { pathType } from '~/types/Header';
const cx = classNames.bind(styles);

const SequenceAdd = () => {
  const CONTENT_TITLES: pathType[] = [
    { text: 'cấp số' },
    { text: 'Danh sách cấp số', to: '/sequence-list' },
    { text: 'Cấp số mới' },
  ];
  const MENU_SERVICE = [
    'Khám tim mạch',
    'Khám sản - Phụ khoa',
    'Khám răng hàm mặt',
    'Khám tai mũi họng',
  ];
  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <h3 className={cx('header-title')}>Quản lý dịch vụ</h3>
        <div className="d-flex flex-column text-center">
          <div className={cx('content')}>
            <div className={cx('form-container')}>
              <h2 className="mb-3 fs-5">Cấp số mới</h2>

              <div className="d-flex flex-column align-items-center gap-3">
                <label>Dịch vụ khách hàng lựa chọn</label>
                <Select
                  sx={[
                    {
                      '&': {
                        width: '300px',
                        backgroundColor: '#FFFFFF',
                      },
                    },
                    {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px',
                      },
                    },
                    {
                      '& .MuiSelect-select': {
                        color: '#535261',
                        padding: '10px 12px 10px 12px',
                        borderRadius: '8px',
                        textAlign: 'start',
                      },
                    },
                    {
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF7506',
                      },
                    },
                    {
                      '& .MuiSvgIcon-root': {
                        color: '#FF7506',
                      },
                    },
                  ]}
                  // onChange={handleFilterData}
                  defaultValue="0"
                  name="MENU_SERVICE"
                >
                  <MenuItem className="d-none" value="0">
                    Chọn dịch vụ
                  </MenuItem>
                  {MENU_SERVICE.map((title: string, index: number) => {
                    return (
                      <MenuItem key={index} value={title}>
                        {title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div className={cx('action-button')}>
                <Button
                  to="/sequence-list"
                  className={cx('action-button__cancel')}
                >
                  Hủy bỏ
                </Button>
                <Button
                  onClick={() => {
                    // updateDevice();
                    // handleUpdateDevice(deviceData?.id, formData);
                  }}
                  className={cx('action-button__primary')}
                >
                  In số
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SequenceAdd;
