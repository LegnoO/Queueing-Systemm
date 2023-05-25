import React, { useState } from 'react';
import styles from './AccountAdd.module.scss';
import classNames from 'classnames/bind';
import Header from '~/layout/Header';
import Button from '~/components/Button';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { pathType } from '~/types/Header';
import { Account } from '~/types/Api';
import { addAccount } from '~/services/api';
const cx = classNames.bind(styles);

interface RoleFilter {
  ROLE_MENU: string[];
  STATUS_MENU: string[];
}

const AccountAdd = () => {
  const CONTENT_TITLES: pathType[] = [
    { text: 'Cài đặt hệ thống' },
    { text: 'Quản lý tài khoản', to: '/account-list' },
    { text: 'Thêm tài khoản' },
  ];
  const STATUS_MENU = ['Ngưng hoạt động', 'Hoạt động'];
  const ROLE_MENU = ['Kế toán', 'Quản lý', 'Admin'];

  const [formData, setFormData] = useState<Account>({
    full_name: '',
    phone_number: '',
    email: '',
    role: '',
    username: '',
    password: '',
    confirm_password: '',
    active_status: '',
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (event: SelectChangeEvent): void => {
    const { value, name } = event.target;
    console.log({ value, name });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formData);

  return (
    <>
      <Header path={CONTENT_TITLES} />;
      <div className={cx('wrapper')}>
        <h3 className={cx('header-title')}>Quản lý thiết bị</h3>
        <div className={cx('content')}>
          <div className={cx('form-container', 'p-4', 'pb-5')}>
            <h4 className={cx('title')}>Thông tin thiết bị</h4>
            <div className="row gap-3">
              <div className="col-2">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Họ tên</label>
                    <input
                      onChange={handleInputChange}
                      // defaultValue={deviceData.data.device_id}
                      name="full_name"
                      type="text"
                      placeholder="Nhập họ tên"
                    />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Số điện thoại</label>
                    <input
                      onChange={handleInputChange}
                      // defaultValue={deviceData.data.device_id}
                      name="phone_number"
                      type="text"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Email</label>
                    <input
                      onChange={handleInputChange}
                      // defaultValue={deviceData.data.device_id}
                      name="email"
                      type="text"
                      placeholder="Nhập email"
                    />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Vai trò</label>
                    <Select
                      sx={[
                        {
                          '&': {
                            width: '100%',
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
                      onChange={handleSelectChange}
                      defaultValue="Kế toán"
                      name="role"
                    >
                      {ROLE_MENU.map((title: string, index: number) => {
                        return (
                          <MenuItem key={index} value={title}>
                            {title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Tên đăng nhập</label>
                    <input
                      onChange={handleInputChange}
                      // defaultValue={deviceData.data.device_id}
                      name="username"
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                    />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Mật khẩu</label>
                    <input
                      onChange={handleInputChange}
                      // defaultValue={deviceData.data.device_id}
                      name="password"
                      type="password"
                      placeholder="Nhập mật khẩu"
                    />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Nhập lại mật khẩu</label>
                    <input
                      onChange={handleInputChange}
                      // defaultValue={deviceData.data.device_id}
                      name="confirm_password"
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Tình trạng</label>
                    <Select
                      sx={[
                        {
                          '&': {
                            width: '100%',
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
                      onChange={handleSelectChange}
                      defaultValue="Tất cả"
                      name="status"
                    >
                      <MenuItem value="Tất cả">Tất cả</MenuItem>
                      {STATUS_MENU.map((title: string, index: number) => {
                        return (
                          <MenuItem key={index} value={title}>
                            {title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('action-button')}>
          <Button to="/account-list" className={cx('action-button__cancel')}>
            Hủy bỏ
          </Button>
          <Button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              addAccount(formData);
            }}
            to="/account-list"
            className={cx('action-button__primary')}
          >
            Thêm
          </Button>
        </div>
      </div>
    </>
  );
};

export default AccountAdd;
