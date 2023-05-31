import styles from './RoleAdd.module.scss';
import classNames from 'classnames/bind';
import { pathType } from '~/types/Header';
import { useState } from 'react';
import { Checkbox } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Role } from '~/types/Api';
import { addRole } from '~/services/api';
import { useAppDispatch } from '~/app/store';
import Button from '~/components/Button';
import Header from '~/layout/Header';
const cx = classNames.bind(styles);

const RoleAdd = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const CONTENT_TITLES: pathType[] = [
    { text: 'Cài đặt hệ thống' },
    { text: 'Quản lý vai trò', to: '/role-list' },
    { text: 'Thêm vai trò' },
  ];
  const [formData, setFormData] = useState<Role>({
    member: 0,
    role_name: '',
    describe: '',
    feature_a: [],
    feature_b: [],
  });
  console.log(formData);
  const FEATURE_MENU = ['Chức năng X', 'Chức năng Y', 'Chức năng Z'];

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { value, name } = event.target;
    // updateRole(roleData.id, formData);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddData = (): void => {
    addRole(formData);
    navigate('/role-list');
  };

  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <h3 className={cx('header-title')}>Danh sách vai trò</h3>
        <div className={cx('content')}>
          <div className="bg-white p-4 rounded-5 vh-100">
            <h4 className={cx('title', 'mb-3')}>Thông tin vai trò</h4>
            <div className="row gap-4">
              <div
                className={cx(
                  'input-form',
                  'd-flex',
                  'col-2',
                  'flex-column',
                  'gap-3',
                )}
              >
                <label htmlFor="">
                  Tên vai trò<span className={cx('warning-require')}>*</span>
                </label>
                <input
                  className="w-100 p-2"
                  type="text"
                  placeholder="Nhập tên vai trò"
                  name="role_name"
                  onChange={handleChange}
                />

                <label htmlFor="">Mô tả</label>
                <textarea
                  className={cx('input-area', 'w-100')}
                  placeholder="Nhập mô tả"
                  name="describe"
                  onChange={handleChange}
                />
                <div className="text-muted mt-3">
                  <span className={cx('warning-require')}>*</span>Là những thông
                  tin bắt buộc
                </div>
              </div>
              <div
                className={cx(
                  'checkbox-form',
                  'd-flex',
                  'flex-column',
                  'col-2',
                  'gap-3',
                  'h-100',
                )}
              >
                <label className="" htmlFor="">
                  Phân quyền chức năng
                  <span className={cx('warning-require')}>*</span>
                </label>
                <div className={cx('checkbox-form-inner', 'rounded-2')}>
                  <div className="d-flex flex-column gap-3 p-4">
                    <div className="mb-4">
                      <h3 className={cx('header-title', 'mb-0', 'fs-2')}>
                        Nhóm chức năng A
                      </h3>
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center gap-2">
                          <Checkbox
                            sx={{
                              '&.MuiButtonBase-root .MuiSvgIcon-root': {
                                color: '#4277FF',
                                // backgroundColor: '#fff',
                              },
                            }}
                            className="p-0"
                            name="feature_a"
                            checked={
                              formData.feature_a.length === FEATURE_MENU.length
                            }
                            onChange={() => {
                              setFormData((prev) => ({
                                ...prev,
                                feature_a:
                                  prev.feature_a.length === FEATURE_MENU.length
                                    ? []
                                    : FEATURE_MENU,
                              }));
                            }}
                          />
                          <label className="fs-1" htmlFor="">
                            Tất cả
                          </label>
                        </div>
                        {FEATURE_MENU.map((menu, index) => {
                          return (
                            <div
                              key={index}
                              className="d-flex align-items-center gap-2"
                            >
                              <Checkbox
                                sx={{
                                  '&.MuiButtonBase-root .MuiSvgIcon-root': {
                                    color: '#4277FF',
                                    // backgroundColor: '#fff',
                                  },
                                }}
                                className="p-0"
                                name="feature_a"
                                checked={formData.feature_a.includes(menu)}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    feature_a: prev.feature_a.includes(menu)
                                      ? prev.feature_a.filter(
                                          (item) => item !== menu,
                                        )
                                      : [...prev.feature_a, menu],
                                  }));
                                }}
                              />
                              <label className="fs-1" htmlFor="">
                                {menu}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className={cx('header-title', 'mb-0', 'fs-2')}>
                        Nhóm chức năng B
                      </h3>
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center gap-2">
                          <Checkbox
                            sx={{
                              '&.MuiButtonBase-root .MuiSvgIcon-root': {
                                color: '#4277FF',
                                // backgroundColor: '#fff',
                              },
                            }}
                            className="p-0"
                            name="feature_b"
                            checked={
                              formData.feature_b.length === FEATURE_MENU.length
                            }
                            onChange={() => {
                              setFormData((prev) => ({
                                ...prev,
                                feature_b:
                                  prev.feature_b.length === FEATURE_MENU.length
                                    ? []
                                    : FEATURE_MENU,
                              }));
                            }}
                          />
                          <label className="fs-1" htmlFor="">
                            Tất cả
                          </label>
                        </div>
                        {FEATURE_MENU.map((menu, index) => {
                          return (
                            <div
                              key={index}
                              className="d-flex align-items-center gap-2"
                            >
                              <Checkbox
                                sx={{
                                  '&.MuiButtonBase-root .MuiSvgIcon-root': {
                                    color: '#4277FF',
                                    // backgroundColor: '#fff',
                                  },
                                }}
                                className="p-0"
                                name="feature_b"
                                checked={formData.feature_b.includes(menu)}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    feature_b: prev.feature_b.includes(menu)
                                      ? prev.feature_b.filter(
                                          (item) => item !== menu,
                                        )
                                      : [...prev.feature_b, menu],
                                  }));
                                }}
                              />
                              <label className="fs-1" htmlFor="">
                                {menu}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('action-button', 'mt-3')}>
        <Button to="/role-list" className={cx('action-button__cancel')}>
          Hủy bỏ
        </Button>
        <Button
          onClick={() => {
            handleAddData();
          }}
          className={cx('action-button__primary')}
        >
          Thêm
        </Button>
      </div>
    </>
  );
};

export default RoleAdd;
