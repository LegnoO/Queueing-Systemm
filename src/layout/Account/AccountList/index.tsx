import React, { useState, useEffect } from 'react';
import { pathType } from '~/types/Header';
import Header from '~/layout/Header';
import styles from './AccountList.module.scss';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useAppSelector, useAppDispatch } from '~/app/store';
import { AccountListType } from '~/types/Api';
import CircleIcon from '@mui/icons-material/Circle';
import { fetchAccountList } from '~/features/accountSlice';
import classNames from 'classnames/bind';
import Search from '~/components/Search';
const cx = classNames.bind(styles);

interface AccountFilter {
  ROLE_MENU: string[];
  SEARCH_TERM: string;
}

const AccountList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accountData = useAppSelector((state) => state.account.data);
  const [data, setData] = useState<AccountListType[]>([]);
  const [dataFilter, setDataFilter] = useState<AccountFilter>({
    ROLE_MENU: ['Kế toán', 'Quản lý', 'Admin'],
    SEARCH_TERM: '',
  });

  const CONTENT_TITLES: pathType[] = [
    { text: 'Cài đặt hệ thống' },
    { text: 'Quản lý tài khoản' },
  ];
  const ROLE_MENU = ['Kế toán', 'Quản lý', 'Admin'];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // setDataFilter((prev) => ({ ...prev, SEARCH_TERM: event.target.value }));
  };
  const handleMoveToUpdate = (id: string): void => {
    const accountUpdate = accountData.filter(
      (account: AccountListType) => account.id === id,
    );

    navigate('/account-update', { state: { account: accountUpdate } });
  };

  const handleFetchData = (): void => {
    dispatch(fetchAccountList());
  };
  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    // setData(
    //   serviceData?.filter((service: ServiceListType) => {
    //     return (
    //       dataFilter.MENU_ACTIVE.includes(service.data.active_status) &&
    //       service.data.serial.includes(dataFilter.SEARCH_TERM)
    //     );
    //   }),
    // );
    setData(accountData);
  }, [accountData, dataFilter]);

  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <div className={cx('inner')}>
          <h3 className={cx('header-title')}>Danh sách tài khoản</h3>
          <div className={cx('content')}>
            <div
              className={cx('form-control', 'justify-content-space-between')}
            >
              <div className={cx('form-field')}>
                <label>Tên vai trò</label>
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
                  onChange={(event: SelectChangeEvent) => {
                    // handleFilterData(event);
                  }}
                  defaultValue="Tất cả"
                  name="ROLE_MENU"
                >
                  <MenuItem value="Tất cả">Tất cả</MenuItem>
                  {ROLE_MENU.map((title: string, index: number) => {
                    return (
                      <MenuItem key={index} value={title}>
                        {title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div className={cx('form-field')}>
                <label>Từ khóa</label>
                <Search
                  className={cx('test2')}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleSearch(event);
                  }}
                />
              </div>
            </div>
            <div className={cx('list-container')}>
              <table className={cx('list-table')}>
                <thead>
                  <tr>
                    <th>Tên đăng nhập</th>
                    <th>Họ tên</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Trạng thái hoạt động</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((content) => {
                    return (
                      <tr key={content.id}>
                        <td>
                          <span>{content.data.username}</span>
                        </td>
                        <td>
                          <span>{content.data.full_name}</span>
                        </td>
                        <td>
                          <span>{content.data.phone_number}</span>
                        </td>
                        <td>
                          <span>{content.data.email}</span>
                        </td>
                        <td>
                          <span>{content.data.role}</span>
                        </td>
                        <td>
                          <p className={cx('status')}>
                            <span className={cx('circle-icon')}>
                              <CircleIcon color="success" />
                            </span>
                            <span>{content.data.active_status}</span>
                          </p>
                        </td>
                        <td>
                          <span
                            onClick={() => {
                              handleMoveToUpdate(content.id);
                            }}
                            className={cx('text-underline', 'pointer')}
                          >
                            Cập nhật
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className={cx('service-btn-container')}>
                <Link to="/account-add">
                  <button className={cx('')}>
                    <span>
                      <AddBoxIcon />
                    </span>
                    <span>Thêm tài khoản</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountList;
