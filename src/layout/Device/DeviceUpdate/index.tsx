/** @format */

import React, { useState, useEffect } from 'react';
import styles from './DeviceUpdate.module.scss';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames/bind';
import { updateDevice } from '~/services/api';
import { Device } from '~/types/Api';
import Button from '~/components/Button';
import { splitString } from '~/util/splitString';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import Header from '~/layout/Header';
import { DeviceListType } from '~/types/Api';
import { RouteParams } from '~/types/Route';
import { fetchDataById } from '~/services/api';
import { pathType } from '~/types/Header';

const cx = classNames.bind(styles);

const DeviceUpdate = () => {
  const { id } = useParams<RouteParams>() as { id: string };
  const [deviceData, setDeviceData] = useState<DeviceListType | undefined>();

  const [formData, setFormData] = useState<Device>({
    service_usage: '',
    active_status: '',
    device_name: '',
    ip: '',
    connect_status: '',
    device_id: '',
    device_type: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await fetchDataById('device-list', id);
      setDeviceData(result);
      setFormData(result.data);
    };
    fetchData();
  }, []);

  // const [service, setService] = useState<string[]>(
  //   splitString(deviceData?.data?.service_usage ?? '', ','),
  // );

  const handleRemoveService = (index: number): void => {
    const newData = formData?.service_usage
      .split(',')
      .filter((_item, indexItem) => indexItem !== index);
    const updatedData = newData.join(',');

    setFormData((prev) => ({ ...prev, service_usage: updatedData }));
  };

  const handleUpdateDevice = (id: string | undefined, data: Device): void => {
    if (id) {
      updateDevice(id, data);
    }
  };

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
    console.log(value, name);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formData);
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
                  defaultValue={deviceData?.data.device_id}
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
                  defaultValue={deviceData?.data.device_name}
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
                  defaultValue={deviceData?.data.ip}
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
                  defaultValue={deviceData?.data.device_type}
                  // value={formData.device_type}
                  value={formData.device_type}
                  name="device_type"
                >
                  <MenuItem style={{ display: 'none' }} value="0">
                    Chọn loại thiết bị
                  </MenuItem>
                  <MenuItem value="Kiosk">Kiosk</MenuItem>
                  <MenuItem value="Display counter">Display counter</MenuItem>
                </Select>
                <label htmlFor="">
                  Tên đăng nhập
                  <span className={cx('warning-require')}>*</span>
                </label>
                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(event);
                  }}
                  defaultValue={deviceData?.data.username}
                  type="text"
                  name="username"
                  placeholder="Nhập tài khoản"
                />
                <label htmlFor="">
                  Nhập mật khẩu
                  <span className={cx('warning-require')}>*</span>
                </label>
                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(event);
                  }}
                  defaultValue={deviceData?.data.password}
                  type="text"
                  name="password"
                  placeholder="Nhập mật khẩu"
                />
              </div>
            </div>
            <div className={cx('device-info__bottom', 'form-field')}>
              <label htmlFor="">
                Dịch vụ sử dụng
                <span className={cx('warning-require')}>*</span>
              </label>
              <div>
                <div className={cx('service__usage-container')}>
                  {formData?.service_usage
                    .split(',')
                    .map((device: string, index: number) => {
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
            <div className="mt-3 w-100 text-muted">
              <span className={cx('warning-require')}>*</span>Là trường thông
              tin bắt buộc
            </div>
          </div>
        </div>

        <div className={cx('action-button')}>
          <Button to="/device-list" className={cx('action-button__cancel')}>
            Hủy bỏ
          </Button>
          <Button
            onClick={() => {
              // updateDevice();
              handleUpdateDevice(deviceData?.id, formData);
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
