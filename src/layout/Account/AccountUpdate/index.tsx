import { pathType } from '~/types/Header';
import { useState } from 'react';
import { Account } from '~/types/Api';
import { useAppDispatch } from '~/app/store';
import { Link, useLocation } from 'react-router-dom';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import Header from '~/layout/Header';
import styles from './AccountUpdate.module.scss';
import classNames from 'classnames/bind';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { updateAccount } from '~/services/api';
const cx = classNames.bind(styles);

const AccountUpdate = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const accountData = location.state.account[0];
  const [formData, setFormData] = useState<Account>(accountData.data);
  const CONTENT_TITLES: pathType[] = [
    { text: 'Cài đặt hệ thống' },
    { text: 'Quản lý tài khoản', to: '/account-list' },
    { text: 'Cập nhật tài khoản' },
  ];
  const STATUS_MENU = ['Ngưng hoạt động', 'Hoạt động'];
  const ROLE_MENU = ['Kế toán', 'Quản lý', 'Admin'];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (event: SelectChangeEvent): void => {
    const { value, name } = event.target;
    console.log({ value, name });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
                      defaultValue={accountData.data.full_name}
                      name="full_name"
                      type="text"
                      placeholder="Nhập họ tên"
                    />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Số điện thoại</label>
                    <input
                      onChange={handleInputChange}
                      defaultValue={accountData.data.phone_number}
                      name="phone_number"
                      type="text"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Email</label>
                    <input
                      onChange={handleInputChange}
                      defaultValue={accountData.data.email}
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
                      defaultValue={accountData.data.username}
                      name="username"
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                    />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Mật khẩu</label>
                    <input
                      onChange={handleInputChange}
                      defaultValue={accountData.data.password}
                      name="password"
                      type="password"
                      placeholder="Nhập mật khẩu"
                    />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="">Nhập lại mật khẩu</label>
                    <input
                      onChange={handleInputChange}
                      defaultValue={accountData.data.confirm_password}
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
            onClick={() => updateAccount(accountData.id, formData)}
            to="/account-list"
            className={cx('action-button__primary')}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </>
  );
};

export default AccountUpdate;
