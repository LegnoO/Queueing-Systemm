/** @format */

import React, { useState } from 'react';
import styles from './DeviceAdd.module.scss';

import classNames from 'classnames/bind';
import { addDevice } from '~/services/api';
import { Device } from '~/types/Api';
import Button from '~/components/Button';

import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import Header from '~/layout/Header';
import { pathType } from '~/types/Header';

const cx = classNames.bind(styles);

const DeviceAdd = () => {
  const [formData, setFormData] = useState<Device>({
    device_id: '',
    device_name: '',
    device_type: '',
    service_usage: '',
    ip: '',
    username: '',
    password: '',
    active_status: '',
    connect_status: '',
  });

  const CONTENT_TITLES: pathType[] = [
    { text: 'Thiết bị' },
    { text: 'Danh sách thiết bị', to: '/device' },
    { text: 'Thêm thiết bị' },
  ];

  console.log(formData);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (event: SelectChangeEvent): void => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <h3 className={cx('header-title')}>Quản lý thiết bị</h3>
        <div className={cx('inner')}>
          <div className={cx('content')}>
            <div className={cx('form-container')}>
              <h4 className={cx('title')}>Thông tin thiết bị</h4>
              <div className={cx('device-info__top')}>
                <div>
                  <label htmlFor="">Mã thiết bị</label>
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event);
                    }}
                    name="device_id"
                    type="text"
                    placeholder="Nhập mã thiết bị"
                  />
                  <label htmlFor="">Tên thiết bị</label>
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event);
                    }}
                    type="text"
                    name="device_name"
                    placeholder="Nhập tên thiết bị"
                  />
                  <label htmlFor="">Địa chỉ IP</label>
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event);
                    }}
                    type="text"
                    name="ip"
                    placeholder="Nhập địa chỉ IP"
                  />
                </div>
                <div>
                  <label htmlFor="">Chọn loại thiết bị</label>
                  <Select
                    onChange={(event: SelectChangeEvent) => {
                      handleSelectChange(event);
                    }}
                    className={cx('select-mui')}
                    sx={[
                      {
                        '&': {
                          height: '44px',
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
                    defaultValue="0"
                    name="device_type"
                  >
                    <MenuItem style={{ display: 'none' }} value="0">
                      Chọn loại thiết bị
                    </MenuItem>
                    <MenuItem value="Kiosk">Kiosk</MenuItem>
                    <MenuItem value="Display counter">Display counter</MenuItem>
                  </Select>
                  <label htmlFor="">Tên đăng nhập</label>
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event);
                    }}
                    type="text"
                    name="username"
                    placeholder="Nhập tài khoản"
                  />
                  <label htmlFor="">Nhập mật khẩu</label>
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event);
                    }}
                    type="text"
                    name="password"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
              </div>
              <div className={cx('device-info__bottom')}>
                <label htmlFor="">Dịch vụ sử dụng</label>
                <div>
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event);
                    }}
                    type="text"
                    name="service_usage"
                    placeholder="Nhập dịch vụ sử dụng"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('action-button')}>
          <Button to="/device" className={cx('action-button__cancel')}>
            Hủy bỏ
          </Button>
          <Button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              addDevice(formData);
            }}
            to="/device"
            className={cx('action-button__primary')}
          >
            Thêm thiết bị
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeviceAdd;
