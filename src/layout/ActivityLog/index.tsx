import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/store';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { fetchActivityList } from '~/features/activitySlice';
import { useNavigate, Link } from 'react-router-dom';
import { formatTimeStampToTime, formatTimeStampToDate } from '~/util/date';
import { DatePicker } from '@mui/x-date-pickers';
import { pathType } from '~/types/Header';
import Header from '~/layout/Header';
import styles from './ActivityLog.module.scss';
import classNames from 'classnames/bind';
import CircleIcon from '@mui/icons-material/Circle';
import ReactPaginate from 'react-paginate';
import { ActivityListType } from '~/types/Api';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Search from '~/components/Search';

import dayjs from 'dayjs';
import { Activity } from '../../types/Api';

const cx = classNames.bind(styles);

interface DataFilter {
  time: {
    start: Date;
    end: Date;
  };
  SEARCH_TERM: string;
}

const ActivityLog = () => {
  const CONTENT_TITLES: pathType[] = [
    { text: 'Cài đặt hệ thống' },
    { text: 'Nhật ký hoạt động' },
  ];

  const [dataFilter, setDataFilter] = useState<DataFilter>({
    time: {
      start: new Date(2022, 1, 1),
      end: new Date(),
    },
    SEARCH_TERM: '',
  });
  const [data, setData] = useState<ActivityListType[]>([]);

  const dispatch = useAppDispatch();
  const activityData = useAppSelector((state) => state.activity.data);

  // Pagination
  const [searchTerm, setSearchTerm] = useState<ActivityListType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const dataPerPage = 5;
  const pagesVisited = currentPage * dataPerPage;
  const pageCount = Math.ceil(searchTerm.length / dataPerPage);
  const currentPageData = data?.slice(pagesVisited, pagesVisited + dataPerPage);
  const handleChangePage = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleFetchData = (): void => {
    dispatch(fetchActivityList());
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDataFilter((prev) => ({ ...prev, SEARCH_TERM: event.target.value }));
  };

  useEffect(() => {
    setData(
      activityData?.filter((activity: ActivityListType) => {
        const timeData = activity.data.logged_time.seconds * 1000;
        const timeFilterStart = dataFilter.time.start.getTime();
        const timeFilterEnd = dataFilter.time.end.getTime();

        return (
          activity.data.username.includes(dataFilter.SEARCH_TERM) &&
          timeData >= timeFilterStart &&
          timeData <= timeFilterEnd
        );
      }),
    );
  }, [activityData, dataFilter]);

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
        <div className={cx('content')}>
          <div
            className={cx(
              'form-control',
              'justify-content-space-between',
              'gap-6',
            )}
          >
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
            <div className={cx('form-field', 'col-5')}>
              <label>Từ khóa</label>
              <Search
                onChange={handleSearch}
                placeholder="Nhập Username"
              />
            </div>
          </div>
          <div className={cx('list-container')}>
            <table className={cx('list-table')}>
              <thead>
                <tr>
                  <th>Tên đăng nhập</th>
                  <th>Thời gian tác động</th>
                  <th>IP thực hiện</th>
                  <th>Thao tác thực hiện</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData?.map((activity) => {
                  return (
                    <tr key={activity.id}>
                      <td>
                        <span>{activity.data.username}</span>
                      </td>
                      <td>
                        <span>
                          {formatTimeStampToTime(
                            activity.data.logged_time.seconds,
                            'HH:mm',
                          )}
                          {' - '}
                          {formatTimeStampToDate(
                            activity.data.logged_time.seconds,
                            'DD-MM-YYYY',
                          )}
                        </span>
                      </td>
                      <td>
                        <span>{activity.data.ip}</span>
                      </td>
                      <td>
                        <span>{activity.data.logged}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

export default ActivityLog;
