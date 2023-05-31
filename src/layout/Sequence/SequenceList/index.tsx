import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/store';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { fetchSequenceList } from '~/features/sequenceSlice';
import { useNavigate, Link } from 'react-router-dom';
import { SequenceListType } from '~/types/Api';
import { formatTimeStampToTime, formatTimeStampToDate } from '~/util/date';
import { DatePicker } from '@mui/x-date-pickers';
import { pathType } from '~/types/Header';
import Header from '~/layout/Header';
import styles from './SequenceList.module.scss';
import classNames from 'classnames/bind';
import CircleIcon from '@mui/icons-material/Circle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Search from '~/components/Search';
import ReactPaginate from 'react-paginate';

import dayjs from 'dayjs';

const cx = classNames.bind(styles);

interface SequenceFilter {
  time: {
    start: Date;
    end: Date;
  };
  SEARCH_TERM: string;
  MENU_SERVICE: string[];
  MENU_STATUS: string[];
  MENU_SOURCE: string[];
}

const SequenceList = () => {
  const CONTENT_TITLES: pathType[] = [
    { text: 'Cấp số' },
    { text: 'Danh sách cấp số' },
  ];

  const MENU_SERVICE = [
    'Khám sản - Phụ khoa',
    'Khám răng hàm mặt',
    'Khám tai mũi họng',
  ];
  const MENU_STATUS = ['Đang chờ', 'Đã sử dụng', 'Bỏ qua'];
  const MENU_SOURCE = ['Kiosk', 'Hệ thống'];

  const [dataFilter, setDataFilter] = useState<SequenceFilter>({
    time: {
      start: new Date(2022, 1, 1),
      end: new Date(),
    },
    SEARCH_TERM: '',
    MENU_SERVICE: MENU_SERVICE,
    MENU_STATUS: MENU_STATUS,
    MENU_SOURCE: MENU_SOURCE,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sequenceData = useAppSelector((state) => state.sequence.data);

  const [data, setData] = useState<SequenceListType[]>([]);
  // Pagination
  const [searchTerm, setSearchTerm] = useState<SequenceListType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const dataPerPage = 5;
  const pagesVisited = currentPage * dataPerPage;
  const pageCount = Math.ceil(searchTerm.length / dataPerPage);
  const currentPageData = data?.slice(pagesVisited, pagesVisited + dataPerPage);
  const handleChangePage = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleFetchData = (): void => {
    dispatch(fetchSequenceList());
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDataFilter((prev) => ({ ...prev, SEARCH_TERM: event.target.value }));
  };

  const handleFilterData = (event: SelectChangeEvent) => {
    type ObjectWithIndex = {
      [key: string]: string[];
    };

    const object: ObjectWithIndex = {
      MENU_SERVICE: MENU_SERVICE,
      MENU_STATUS: MENU_STATUS,
      MENU_SOURCE: MENU_SOURCE,
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

  const handleMoveToDetail = (id: string): void => {
    navigate(`/sequence-detail/${id}`);
  };

  useEffect(() => {
    setData(
      sequenceData?.filter((sequence: SequenceListType) => {
        const timeData = sequence.data.timestamp_start.seconds * 1000;
        const timeFilterStart = dataFilter.time.start.getTime();
        const timeFilterEnd = dataFilter.time.end.getTime();

        return (
          dataFilter.MENU_STATUS.includes(sequence.data.status) &&
          dataFilter.MENU_SOURCE.includes(sequence.data.source) &&
          dataFilter.MENU_SERVICE.includes(sequence.data.service_name) &&
          sequence.data.customer_name.includes(dataFilter.SEARCH_TERM) &&
          timeData >= timeFilterStart &&
          timeData <= timeFilterEnd
        );
      }),
    );
  }, [sequenceData, dataFilter]);

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    setSearchTerm(data);
  }, [data]);
  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <h3 className={cx('header-title')}>Quản lý cấp số</h3>
        <div className={cx('content')}>
          <div className={cx('form-control', 'gap-3')}>
            <div className={cx('form-field', 'col')}>
              <label>Tên dịch vụ</label>
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
                onChange={(event: SelectChangeEvent) => {
                  handleFilterData(event);
                }}
                defaultValue="Tất cả"
                name="MENU_SERVICE"
              >
                <MenuItem value="Tất cả">Tất cả</MenuItem>
                {MENU_SERVICE.map((title: string, index: number) => {
                  return (
                    <MenuItem key={index} value={title}>
                      {title}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={cx('form-field', 'col')}>
              <label>Tình trạng</label>
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
                onChange={(event: SelectChangeEvent) => {
                  handleFilterData(event);
                }}
                defaultValue="Tất cả"
                name="MENU_STATUS"
              >
                <MenuItem value="Tất cả">Tất cả</MenuItem>
                {MENU_STATUS.map((title: string, index: number) => {
                  return (
                    <MenuItem key={index} value={title}>
                      {title}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={cx('form-field', 'col')}>
              <label>Nguồn cấp</label>
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
                onChange={handleFilterData}
                defaultValue="Tất cả"
                name="MENU_SOURCE"
              >
                <MenuItem value="Tất cả">Tất cả</MenuItem>
                {MENU_SOURCE.map((title: string, index: number) => {
                  return (
                    <MenuItem key={index} value={title}>
                      {title}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={cx('form-field', 'col')}>
              <label>Chọn thời gian</label>
              <div className="d-flex align-items-center">
                <DatePicker
                  // required
                  defaultValue={dayjs()}
                  value={dayjs(dataFilter.time.start)}
                  onChange={(date) =>
                    date &&
                    setDataFilter((prev) => ({
                      ...prev,
                      time: { ...prev.time, start: date.toDate() },
                    }))
                  }
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
                      border: '0 !important',
                    },
                  }}
                  format="DD/MM/YYYY"
                />
                <span className="d-flex align-center-items">
                  {<ArrowRightIcon />}
                </span>
                <DatePicker
                  // required
                  defaultValue={dayjs()}
                  value={dayjs(dataFilter.time.end)}
                  onChange={(date) =>
                    date &&
                    setDataFilter((prev) => ({
                      ...prev,
                      time: { ...prev.time, end: date.toDate() },
                    }))
                  }
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
                      border: '0 !important',
                    },
                  }}
                  format="DD/MM/YYYY"
                />
              </div>
            </div>
            <div className={cx('form-field', 'col')}>
              <label>Từ khóa</label>
              <Search
                placeholder="Nhập ID"
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
                  <th>STT</th>
                  <th>Tên Khách hàng</th>
                  <th>Tên dịch vụ</th>
                  <th>Thời gian cấp</th>
                  <th>Hạn sử dụng</th>
                  <th>Trạng thái</th>
                  <th>Nguồn cấp</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentPageData?.map((sequence) => {
                  return (
                    <tr key={sequence.id}>
                      <td>
                        <span>{sequence.data.stt}</span>
                      </td>
                      <td>
                        <span>{sequence.data.customer_name}</span>
                      </td>
                      <td>
                        <span>{sequence.data.service_name}</span>
                      </td>
                      <td>
                        <span>
                          {formatTimeStampToTime(
                            sequenceData[0].data.timestamp_start.seconds,
                            'HH:mm',
                          )}
                          {' - '}
                          {formatTimeStampToDate(
                            sequenceData[0].data.timestamp_start.seconds,
                            'DD-MM-YYYY',
                          )}
                        </span>
                      </td>
                      <td>
                        <span>
                          {formatTimeStampToTime(
                            sequenceData[0]?.data.timestamp_end.seconds,
                            'HH:mm',
                          )}
                          {' - '}
                          {formatTimeStampToDate(
                            sequenceData[0]?.data.timestamp_end.seconds,
                            'DD-MM-YYYY',
                          )}
                        </span>
                      </td>
                      <td>
                        <p className={cx('status')}>
                          <span className={cx('circle-icon')}>
                            <CircleIcon
                              color={
                                sequence.data.status === 'Đang chờ'
                                  ? 'info'
                                  : sequence.data.status === 'Đã sử dụng'
                                  ? undefined
                                  : sequence.data.status === 'Bỏ qua'
                                  ? 'error'
                                  : undefined
                              }
                            />
                          </span>
                          <span>{sequence.data.status}</span>
                        </p>
                      </td>
                      <td>
                        <span>{sequence.data.source}</span>
                      </td>
                      <td>
                        <span
                          onClick={() => {
                            handleMoveToDetail(sequence.id);
                          }}
                          className={cx('text-underline', 'pointer')}
                        >
                          Chi tiết
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={cx('service-btn-container')}>
              <Link to="/sequence-add">
                <button className={cx('')}>
                  <span>
                    <AddBoxIcon />
                  </span>
                  <span>Cấp số mới</span>
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

export default SequenceList;
