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
import styles from './ActivityLog.module.scss';
import classNames from 'classnames/bind';
import CircleIcon from '@mui/icons-material/Circle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Search from '~/components/Search';

import dayjs from 'dayjs';

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

  //   const [dataFilter, setDataFilter] = useState<SequenceFilter>({
  //     time: {
  //       start: new Date(),
  //       end: new Date(),
  //     },
  //     SEARCH_TERM: '',
  //   });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sequenceData = useAppSelector((state) => state.sequence.data);

  const [data, setData] = useState<SequenceListType[]>([]);

  const handleFetchData = (): void => {
    dispatch(fetchSequenceList());
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // setDataFilter((prev) => ({ ...prev, SEARCH_TERM: event.target.value }));
  };

  const handleMoveToDetail = (id: string): void => {
    const sequenceDetail = sequenceData.filter(
      (sequence: SequenceListType) => sequence.id === id,
    );

    navigate('/sequence-detail', { state: { sequence: sequenceDetail } });
  };

  //   useEffect(() => {
  //     setData(
  //       sequenceData?.filter((sequence: SequenceListType) => {
  //         return (
  //           dataFilter.MENU_STATUS.includes(sequence.data.status) &&
  //           dataFilter.MENU_SOURCE.includes(sequence.data.source) &&
  //           dataFilter.MENU_SERVICE.includes(sequence.data.service_name) &&
  //           sequence.data.customer_name.includes(dataFilter.SEARCH_TERM)
  //         );
  //       }),
  //     );
  //   }, [sequenceData, dataFilter]);

  //   useEffect(() => {
  //     handleFetchData();
  //   }, []);

  return (
    <>
      <Header path={CONTENT_TITLES} />
      {/* <div className={cx('wrapper')}>
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
            <div className={cx('form-field', 'col')}>
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
                  <th>Thời gian tác động</th>
                  <th>IP thực hiện</th>
                  <th>Thao tác thực hiện</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((sequence) => {
                  return (
                    <tr key={sequence.id}>
                      <td>
                        <span>{sequence.data.stt}</span>
                      </td>
                      <td>
                        <span>
                          {formatTimeStampToTime(
                            sequenceData[0]?.data.timestamp_start.seconds,
                            'HH:mm',
                          )}
                          {' - '}
                          {formatTimeStampToDate(
                            sequenceData[0]?.data.timestamp_start.seconds,
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
                        <span>{sequence.data.source}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ActivityLog;
