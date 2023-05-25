/** @format */

import React, { useState, useEffect } from 'react';
import styles from './DeviceUpdate.module.scss';
import { Link, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames/bind';
import { updateDevice } from '~/services/api';
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
  console.log(deviceData.data);
  const [service, setService] = useState<string[]>(
    splitString(deviceData.data.service_usage, ','),
  );

  const handleRemoveService = (index: number): void => {
    const newData = service.filter((_item, indexItem) => indexItem !== index);
    setService(newData);
    setFormData((prev) => ({ ...prev, service_usage: newData.join(',') }));
  };

  const [formData, setFormData] = useState<Device>(deviceData.data);

  const CONTENT_TITLES: pathType[] = [
    { text: 'Thiết bị' },
    { text: 'Danh sách thiết bị', to: '/device-list' },
    { text: 'Cập nhật thiết bị' },
  ];

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
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
        <h3 className={cx('header-title')}>Thông tin thiết bị</h3>

        <div className={cx('content')}>
          <div className={cx('device-info')}>
            <div className={cx('device-info__top')}>
              <div>
                <label htmlFor="">
                  Mã thiết bị<span className={cx('warning-require')}>*</span>
                </label>
                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(event);
                  }}
                  defaultValue={deviceData.data.device_id}
                  name="device_id"
                  type="text"
                  placeholder="Nhập mã thiết bị"
                />
                <label htmlFor="">
                  Tên thiết bị<span className={cx('warning-require')}>*</span>
                </label>
                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(event);
                  }}
                  defaultValue={deviceData.data.device_name}
                  type="text"
                  name="device_name"
                  placeholder="Nhập tên thiết bị"
                />
                <label htmlFor="">
                  Địa chỉ IP<span className={cx('warning-require')}>*</span>
                </label>
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
                <label htmlFor="">
                  Chọn loại thiết bị
                  <span className={cx('warning-require')}>*</span>
                </label>
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
                <label htmlFor="">
                  Tên đăng nhập<span className={cx('warning-require')}>*</span>
                </label>
                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(event);
                  }}
                  defaultValue={deviceData.data.username}
                  type="text"
                  name="username"
                  placeholder="Nhập tài khoản"
                />
                <label htmlFor="">
                  Nhập mật khẩu<span className={cx('warning-require')}>*</span>
                </label>
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
            <div className={cx('device-info__bottom', 'form-field')}>
              <label htmlFor="">
                Dịch vụ sử dụng<span className={cx('warning-require')}>*</span>
              </label>
              <div>
                <div className={cx('service__usage-container')}>
                  {service.map((device: string, index: number) => {
                    return (
                      <div key={index}>
                        <Button
                          onClick={() => {
                            handleRemoveService(index);
                          }}
                          endIcon={<CloseIcon />}
                          className={cx('service__usage-item')}
                        >
                          {device}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-3 w-100 text-muted"><span className={cx("warning-require")}>*</span>Là trường thông tin bắt buộc</div>
          </div>
        </div>

        <div className={cx('action-button')}>
          <Button to="/device-list" className={cx('action-button__cancel')}>
            Hủy bỏ
          </Button>
          <Button
            onClick={() => {
              updateDevice(deviceData.id, formData);
            }}
            to="/device-list"
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
