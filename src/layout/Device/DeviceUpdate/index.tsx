/** @format */

import React, { useState, useEffect } from 'react';
import styles from './DeviceUpdate.module.scss';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { updateDateTicket } from '~/services/api';
import { Device } from '~/types/Api';
import Button from '~/components/Button';
import { splitString } from '~/util/splitString';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import Header from '~/layout/Header';
import { pathType } from '~/types/Header';

const cx = classNames.bind(styles);

const DeviceUpdate = () => {
  const location = useLocation();
  const deviceData = location.state.device[0];

  const [service, setService] = useState<string[]>([]);

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
    { text: 'Cập nhật thiết bị' },
  ];

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
        <h3>Thông tin thiết bị</h3>
        <div className={cx('inner')}>
          <div className={cx('content')}>
            <div className={cx('device-info')}>
              <div className={cx('device-info__top')}>
                <div>
                  <label htmlFor="">Mã thiết bị</label>
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event);
                    }}
                    defaultValue={deviceData.data.device_id}
                    name="device_id"
                    type="text"
                    placeholder="Nhập mã thiết bị"
                  />
                  <label htmlFor="">Tên thiết bị</label>
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event);
                    }}
                    defaultValue={deviceData.data.device_name}
                    type="text"
                    name="device_name"
                    placeholder="Nhập tên thiết bị"
                  />
                  <label htmlFor="">Địa chỉ IP</label>
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event);
                    }}
                    defaultValue={deviceData.data.ip}
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
                    defaultValue={deviceData.data.device_type}
                    //defaultValue="0"
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
                    defaultValue={deviceData.data.username}
                    type="text"
                    name="username"
                    placeholder="Nhập tài khoản"
                  />
                  <label htmlFor="">Nhập mật khẩu</label>
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event);
                    }}
                    defaultValue={deviceData.data.password}
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
                    // defaultValue={splitString(
                    //   deviceData.data.service_usage,
                    //   ',',
                    // )}
                    placeholder="Nhập dịch vụ sử dụng"
                  />
                  <div className={cx('service__usage-container')}>
                    {splitString(deviceData.data.service_usage, ',').map(
                      (device: string, index: number) => {
                        return <div key={index}>{device}</div>;
                      },
                    )}
                  </div>
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
              updateDateTicket(deviceData.id, formData);
            }}
            to="/device"
            className={cx('action-button__primary')}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeviceUpdate;
