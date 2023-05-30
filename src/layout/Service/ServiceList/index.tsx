import { pathType } from '~/types/Header';
import { useEffect, useState } from 'react';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate, Link } from 'react-router-dom';
import { fetchServiceList } from '~/features/serviceSlice';
import { ServiceListType } from '~/types/Api';
import { useAppSelector, useAppDispatch } from '~/app/store';
import styles from './ServiceList.module.scss';
import classNames from 'classnames/bind';
import Search from '~/components/Search';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CircleIcon from '@mui/icons-material/Circle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import dayjs from 'dayjs';
import Header from '~/layout/Header';
import ReactPaginate from 'react-paginate';
const cx = classNames.bind(styles);

interface ServiceFilter {
  MENU_ACTIVE: string[];
  SEARCH_TERM: string;
}

const ServiceList = () => {
  const CONTENT_TITLES: pathType[] = [
    { text: 'Dịch vụ' },
    { text: 'Danh sách dịch vụ' },
  ];
  const [data, setData] = useState<ServiceListType[]>([]);

  // Pagination
  const [searchTerm, setSearchTerm] = useState<ServiceListType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const dataPerPage = 5;
  const pagesVisited = currentPage * dataPerPage;
  const pageCount = Math.ceil(searchTerm.length / dataPerPage);
  const currentPageData = data?.slice(pagesVisited, pagesVisited + dataPerPage);
  const handleChangePage = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const [dataFilter, setDataFilter] = useState<ServiceFilter>({
    MENU_ACTIVE: ['Hoạt động', 'Ngưng hoạt động'],
    SEARCH_TERM: '',
  });
  const MENU_ACTIVE = ['Tất cả', 'Hoạt động', 'Ngưng hoạt động'];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const serviceData = useAppSelector((state) => state.service.data);

  const handleMoveToDetail = (id: string): void => {
    navigate(`/service-detail/${id}`);
  };

  const handleMoveToUpdate = (id: string): void => {
    navigate(`/service-update/${id}`);
  };

  const handleFilterData = (event: SelectChangeEvent) => {
    type ObjectWithIndex = {
      [key: string]: string[];
    };

    const object: ObjectWithIndex = {
      MENU_ACTIVE: MENU_ACTIVE,
    };

    const { value, name } = event.target as { value: string; name: string };

    if (value === 'Tất cả') {
      setDataFilter((prev) => ({
        ...prev,
        [name]: object[name].filter((value) => value !== 'Tất cả'),
      }));
    } else {
      setDataFilter((prev) => ({ ...prev, [name]: [value] }));
    }
  };

  useEffect(() => {
    setData(
      serviceData.filter((service: ServiceListType) => {
        return (
          dataFilter.MENU_ACTIVE.includes(service.data.active_status) &&
          service?.data?.service_id?.includes(dataFilter.SEARCH_TERM)
        );
      }),
    );
  }, [serviceData, dataFilter]);

  const handleFetchData = (): void => {
    dispatch(fetchServiceList());
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDataFilter((prev) => ({ ...prev, SEARCH_TERM: event.target.value }));
  };

  useEffect(() => {
    setSearchTerm(data);
  }, [data]);

  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <h3 className={cx('header-title')}>Quản lý dịch vụ</h3>
        <div className={cx('content')}>
          <div className={cx('form-control')}>
            <div className={cx('form-field')}>
              <label>Trạng thái hoạt động</label>
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
                  handleFilterData(event);
                }}
                defaultValue="Tất cả"
                name="MENU_ACTIVE"
              >
                {MENU_ACTIVE.map((title: string, index: number) => {
                  return (
                    <MenuItem key={index} value={title}>
                      {title}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            <div className={cx('form-field')}>
              <label>Chọn thời gian</label>
              <div className="d-flex align-items-center gap-2">
                <DatePicker
                  // required
                  value={dayjs()}
                  sx={{
                    '&': {
                      background: '#FFF',
                    },
                    '&.MuiFormControl-root .MuiSvgIcon-root': {
                      color: '#FF993C',
                    },
                    '&.MuiFormControl-root .MuiInputBase-root': {
                      height: '43px',
                    },
                    '&.MuiFormControl-root .MuiInputBase-input': {
                      padding: '12px 13px',
                      width: '86px',
                      border: 'none',
                    },
                  }}
                  format="DD/MM/YYYY"
                />
                <span className="d-flex align-center-items">
                  {<ArrowRightIcon />}
                </span>
                <DatePicker
                  // required
                  value={dayjs()}
                  sx={{
                    '&': {
                      background: '#FFF',
                    },
                    '&.MuiFormControl-root .MuiSvgIcon-root': {
                      color: '#FF993C',
                    },
                    '&.MuiFormControl-root .MuiInputBase-root': {
                      height: '43px',
                    },
                    '&.MuiFormControl-root .MuiInputBase-input': {
                      padding: '12px 13px',
                      width: '86px',
                      border: 'none',
                    },
                  }}
                  format="DD/MM/YYYY"
                />
              </div>
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
                  <th>Mã dịch vụ</th>
                  <th>Tên dịch vụ</th>
                  <th>Mô tả</th>
                  <th>Trạng thái hoạt động</th>

                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentPageData?.map((service) => {
                  return (
                    <tr key={service.id}>
                      <td>
                        <span>{service.data.service_id}</span>
                      </td>
                      <td>
                        <span>{service.data.service_name}</span>
                      </td>
                      <td>
                        <span>{service.data.describe}</span>
                      </td>
                      <td>
                        <p className={cx('status')}>
                          <span className={cx('circle-icon')}>
                            <CircleIcon
                              color={
                                service.data.active_status === 'Hoạt động'
                                  ? 'success'
                                  : service.data.active_status ===
                                    'Ngưng hoạt động'
                                  ? 'error'
                                  : undefined
                              }
                            />
                          </span>
                          <span>{service.data.active_status}</span>
                        </p>
                      </td>
                      <td>
                        <span
                          onClick={() => {
                            handleMoveToDetail(service.id);
                          }}
                          className={cx('text-underline', 'pointer')}
                        >
                          Chi tiết
                        </span>
                      </td>
                      <td>
                        <span
                          onClick={() => {
                            handleMoveToUpdate(service.id);
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
              <Link to="/service-add">
                <button className={cx('')}>
                  <span>
                    <AddBoxIcon />
                  </span>
                  <span>Thêm dịch vụ</span>
                </button>
              </Link>
            </div>
          </div>
          <ReactPaginate
            previousLabel={'◄'}
            nextLabel={'►'}
            breakLabel={'...'}
            pageCount={pageCount}
            onPageChange={handleChangePage}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            forcePage={currentPage}
            containerClassName="pagination"
            activeClassName="page-active"
          />
        </div>
      </div>
    </>
  );
};

export default ServiceList;
