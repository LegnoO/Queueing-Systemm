import styles from './ServiceDetail.module.scss';
import classNames from 'classnames/bind';
import { pathType } from '~/types/Header';
import { useEffect, useState } from 'react';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';
import { fetchServiceList } from '~/features/serviceSlice';
import { ServiceListType } from '~/types/Api';
import { RouteParams } from '~/types/Route';
import { fetchDataById } from '~/services/api';
import Search from '~/components/Search';
import { useAppSelector, useAppDispatch } from '~/app/store';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CircleIcon from '@mui/icons-material/Circle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import dayjs from 'dayjs';
import Header from '~/layout/Header';
const cx = classNames.bind(styles);

interface ServiceFilter {
  MENU_STATUS: string[];
  SEARCH_TERM: string;
}

const ServiceDetail = () => {
  const { id } = useParams<RouteParams>() as { id: string };
  const dispatch = useAppDispatch();
  const serviceData = useAppSelector((state) => state.service.data);
  const navigate = useNavigate();
  const [serviceDataDetail, setServiceDataDetail] = useState<
    ServiceListType | undefined
  >();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await fetchDataById('service-list', id);
      setServiceDataDetail(result);
    };
    fetchData();
  }, []);
  const CONTENT_TITLES: pathType[] = [
    { text: 'Dịch vụ' },
    { text: 'Danh sách dịch vụ', to: '/service-list' },
    { text: 'Chi tiết' },
  ];
  const [data, setData] = useState<ServiceListType[]>([]);
  const [dataFilter, setDataFilter] = useState<ServiceFilter>({
    MENU_STATUS: ['Đã hoàn thành', 'Đang thực hiện', 'Vắng'],
    SEARCH_TERM: '',
  });

  const handleMoveToUpdate = (id: string | undefined): void => {
    navigate(`/service-update/${id}`);
  };

  const MENU_STATUS = ['Tất cả', 'Đã hoàn thành', 'Đã thực hiện', 'Vắng'];

  const handleFilterData = (event: SelectChangeEvent) => {
    type ObjectWithIndex = {
      [key: string]: string[];
    };

    const object: ObjectWithIndex = {
      MENU_STATUS: MENU_STATUS,
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
          dataFilter.MENU_STATUS.includes(service.data.status) &&
          service?.data?.serial?.includes(dataFilter.SEARCH_TERM)
        );
      }),
    );
  }, [serviceData, dataFilter]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDataFilter((prev) => ({ ...prev, SEARCH_TERM: event.target.value }));
  };

  const handleFetchData = (): void => {
    dispatch(fetchServiceList());
  };

  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <h3 className={cx('header-title')}>Quản lý dịch vụ</h3>
        <div className={cx('content')}>
          <div>
            <div className={cx('data-detail')}>
              <div
                className={cx('info', 'mb-4', 'gap-2', 'd-flex', 'flex-column')}
              >
                <h4 className={cx('title', 'mb-3')}>Thông tin dịch vụ</h4>
                <div className="row">
                  <p className={cx('col-3')}>Mã dịch vụ:</p>
                  <span className={cx('col')}>
                    {serviceDataDetail?.data.service_id}
                  </span>
                </div>
                <div className="row">
                  <p className={cx('col-3')}>Tên dịch vụ:</p>
                  <span className={cx('col')}>
                    {serviceDataDetail?.data.service_name}
                  </span>
                </div>
                <div className="row">
                  <p className={cx('col-3')}>Mô tả:</p>
                  <span className={cx('col')}>
                    {serviceDataDetail?.data.describe}
                  </span>
                </div>
              </div>
              <div className={cx('rule', 'mb-4')}>
                <h4 className={cx('title', 'mb-3')}>Quy tắc cấp số</h4>
                <div className="row gap-3 flex-column">
                  {serviceDataDetail?.data.auto_increase ? (
                    <div className="row gap-3 align-items-center w-100">
                      <p className={cx('col-3')}>Tăng tự động:</p>
                      <span className={cx('col d-flex align-items-center')}>
                        <div className={cx('box-number')}>001</div>
                        <p className="mx-3">đến</p>
                        <div className={cx('box-number')}>1100</div>
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {serviceDataDetail?.data.prefix ? (
                    <div className="row gap-3 align-items-center w-100">
                      <p className="col-3">Prefix:</p>
                      <div className={cx('box-number', 'text-muted')}>001</div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {serviceDataDetail?.data.reset ? (
                    <div>
                      <p>Reset mỗi ngày</p>
                      <p className={cx('mt-3', 'text-muted')}>
                        Ví dụ: 201-2001
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className={cx('data-filter')}>
              <div className={cx('form-control', 'gap-2')}>
                <div className={cx('form-field')}>
                  <label>Trạng thái</label>
                  <Select
                    sx={[
                      {
                        '&': {
                          width: '140px',
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
                          fontSize: '0.9rem',
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
                    name="MENU_STATUS"
                  >
                    {MENU_STATUS.map((title: string, index: number) => {
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
                  <div className="d-flex align-items-center">
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
                          fontSize: '0.9rem',
                        },
                        '&.MuiFormControl-root .MuiInputBase-input': {
                          padding: '12px 13px',
                          width: '73px',
                          border: '0px !important',
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
                          fontSize: '0.9rem',
                        },
                        '&.MuiFormControl-root .MuiInputBase-input': {
                          padding: '12px 13px',
                          width: '73px',
                          border: '0px',
                        },
                      }}
                      format="DD/MM/YYYY"
                    />
                  </div>
                </div>
                <div className={cx('form-field', 'ms-auto')}>
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
                      <th>Số thứ tự</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((service) => {
                      return (
                        <tr key={service.id}>
                          <td>
                            <span>{service.data.serial}</span>
                          </td>

                          <td>
                            <p className={cx('status')}>
                              <span className={cx('circle-icon')}>
                                <CircleIcon
                                  color={
                                    service.data.status === 'Đã hoàn thành'
                                      ? 'success'
                                      : service.data.status === 'Đang thực hiện'
                                      ? 'info'
                                      : service.data.status === 'Vắng'
                                      ? undefined
                                      : undefined
                                  }
                                />
                              </span>
                              <span>{service.data.status}</span>
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className={cx('service-btn-container')}>
                  <button
                    onClick={() => handleMoveToUpdate(serviceDataDetail?.id)}
                  >
                    <span>
                      <AddBoxIcon />
                    </span>
                    <span>Cập nhật danh sách</span>
                  </button>

                  <Link to="/service-list">
                    <button>
                      <span>
                        <AddBoxIcon />
                      </span>
                      <span>Quay lại</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
