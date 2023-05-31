import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/store';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { fetchRoleList } from '~/features/roleSlice';
import { RoleListType } from '~/types/Api';
import { formatTimeStampToTime, formatTimeStampToDate } from '~/util/date';
import { pathType } from '~/types/Header';
import Header from '~/layout/Header';
import styles from './RoleList.module.scss';
import classNames from 'classnames/bind';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Search from '~/components/Search';


const cx = classNames.bind(styles);

const RoleList = () => {
  const [data, setData] = useState<RoleListType[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const roleData = useAppSelector((state) => state.role.data);

  const [dataFilter, setDataFilter] = useState<{ SEARCH_TERM: string }>({
    SEARCH_TERM: '',
  });

  const CONTENT_TITLES: pathType[] = [
    { text: 'Cài đặt hệ thống' },
    { text: 'Quản lý vai trò' },
  ];

  const handleFetchData = (): void => {
    dispatch(fetchRoleList());
  };

  const handleMoveToUpdate = (id: string): void => {
    navigate(`/role-update/${id}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDataFilter((prev) => ({ ...prev, SEARCH_TERM: event.target.value }));
  };

  useEffect(() => {
    setData(
      roleData.filter((content: RoleListType) => {
        return content?.data?.role_name?.includes(dataFilter.SEARCH_TERM);
      }),
    );
  }, [roleData, dataFilter]);

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <div
            className={cx(
              'form-control',
              'justify-content-space-between',
              'gap-6',
            )}
          >
            <h3 className={cx('header-title')}>Danh sách vai trò</h3>
            <div className={cx('form-field')}>
              <label>Từ khóa</label>
              <Search
                className={cx('search-bar')}
                placeholder="Nhập role"
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className={cx('list-container')}>
            <table className={cx('list-table')}>
              <thead>
                <tr>
                  <th>Vai trò</th>
                  <th>Số người dùng</th>
                  <th>Mô tả</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>
                        <span>{data.data.role_name}</span>
                      </td>
                      <td>
                        <span>{data.data.member}</span>
                      </td>

                      <td>
                        <span>{data.data.describe}</span>
                      </td>
                      <td>
                        <span
                          className="text-underline pointer "
                          onClick={() => handleMoveToUpdate(data.id)}
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
              <Link to="/role-add">
                <button className={cx('')}>
                  <span>
                    <AddBoxIcon />
                  </span>
                  <span>Thêm vai trò</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleList;
