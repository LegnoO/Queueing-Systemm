import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/store';
import { Select, SelectChangeEvent, MenuItem, Checkbox } from '@mui/material';
import { fetchSequenceList } from '~/features/sequenceSlice';
import { SequenceListType } from '~/types/Api';
import {
  exportToExcel,
  formatTimeStampToDate,
  formatTimeStampToTime,
} from '~/util/helpers';
import ReactPaginate from 'react-paginate';
import { DatePicker } from '@mui/x-date-pickers';
import { pathType } from '~/types/Header';
import Header from '~/layout/Header';
import styles from './ReportList.module.scss';
import classNames from 'classnames/bind';
import CircleIcon from '@mui/icons-material/Circle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import dayjs from 'dayjs';

const cx = classNames.bind(styles);

type ObjectWithIndex = {
  [key: string]: string[];
};

type DataProps = {
  time: {
    start: Date;
    end: Date;
  };
  SERVICE: string[];
  STATUS: string[];
  SOURCE: string[];
};

const ReportList = () => {
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

  const [serviceList, setServiceList] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const sequenceData = useAppSelector((state) => state.sequence.data);
  const MENU: ObjectWithIndex = {
    SERVICE: [
      'Khám tim mạch',
      'Khám mắt',
      'Khám tổng quát',
      'Răng hàm mặt',
      'Khám sản - phụ khoa',
      'Khám hô hấp',
      'Khám tai mũi họng',
    ],
    STATUS: ['Đang chờ', 'Đã sử dụng', 'Bỏ qua'],
    SOURCE: ['Kiosk', 'Hệ thống'],
  };
  const [dataFilter, setDataFilter] = useState<DataProps>({
    time: {
      start: new Date(2022, 1, 1),
      end: new Date(),
    },
    SERVICE: MENU.SERVICE,
    STATUS: MENU.STATUS,
    SOURCE: MENU.SOURCE,
  });

  // console.log(sequenceData, dataFilter.time.sstart.getTime());
  const CONTENT_TITLES: pathType[] = [
    { text: 'Báo cáo' },
    { text: 'Lập báo cáo' },
  ];

  // useEffect(() => {
  //   handleFetchData();
  // }, []);

  const handleFilterData = (event: SelectChangeEvent) => {
    const { value, name } = event.target as { value: string; name: string };

    if (value === 'all') {
      setDataFilter((prev) => ({
        ...prev,
        [name]: MENU[name].filter((value) => value !== 'all'),
      }));
    } else {
      setDataFilter((prev) => ({ ...prev, [name]: [value] }));
    }
  };

  const handleFetchData = (): void => {
    dispatch(fetchSequenceList());
  };

  const handleConvertDataExcel = () => {
    const newData = sequenceData.map(
      ({
        data: {
          timestamp_start: { seconds: startDateSeconds },
          timestamp_end: { seconds: endDateSeconds },
          ...rest
        },
      }) => ({
        ...rest,
        timestamp_start: `${formatTimeStampToTime(
          startDateSeconds,
          'HH:mm',
        )} - ${formatTimeStampToDate(startDateSeconds, 'DD-MM-YYYY')}`,
        timestamp_end: `${formatTimeStampToTime(
          endDateSeconds,
          'HH:mm',
        )} - ${formatTimeStampToDate(endDateSeconds, 'DD-MM-YYYY')}`,
      }),
    );
    exportToExcel(newData, 'Excel export');
  };

  useEffect(() => {
    setData(
      sequenceData?.filter((sequence: SequenceListType) => {
        const timeData = sequence.data.timestamp_start.seconds * 1000;
        const timeFilterStart = dataFilter.time.start.getTime();
        const timeFilterEnd = dataFilter.time.end.getTime();

        return (
          dataFilter.STATUS.includes(sequence.data.status) &&
          dataFilter.SOURCE.includes(sequence.data.source) &&
          dataFilter.SERVICE.includes(sequence.data.service_name) &&
          timeFilterStart <= timeData &&
          timeFilterEnd >= timeData
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
        <div className={cx('content')}>
          <div className={cx('form-control', 'gap-6')}>
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
          </div>
          <div className={cx('list-container')}>
            <table className={cx('list-table')}>
              <thead>
                <tr>
                  <th className="">Số thứ tự</th>
                  <th className="p-0">
                    <Select
                      sx={[
                        {
                          '&': {
                            width: '100%',
                            backgroundColor: 'transparent',
                          },
                        },
                        {
                          '& .MuiSelect-select::after': {
                            content: '"Tên dịch vụ"',
                          },
                        },
                        {
                          '& .MuiSelect-select': {
                            color: '#FFF',
                            fontWeight: '700',
                          },
                        },
                        {
                          '& .MuiSvgIcon-root': {
                            color: '#FFF',
                          },
                        },
                        {
                          '& fieldset': { border: '0' },
                        },
                        {},
                      ]}
                      value={serviceList}
                      multiple
                      onChange={(event: SelectChangeEvent<string[]>) => {
                        setDataFilter((prev) => {
                          if (
                            event.target.value[0] === 'all' &&
                            dataFilter.SERVICE.length !== MENU.SERVICE.length
                          ) {
                            return {
                              ...prev,
                              SERVICE: MENU.SERVICE,
                            };
                          } else if (
                            event.target.value[0] === 'all' &&
                            dataFilter.SERVICE.length === MENU.SERVICE.length
                          ) {
                            return {
                              ...prev,
                              SERVICE: [],
                            };
                          } else if (
                            prev.SERVICE.includes(event.target.value[0])
                          ) {
                            return {
                              ...prev,
                              SERVICE: prev.SERVICE.filter(
                                (item) => item !== event.target.value[0],
                              ),
                            };
                          } else {
                            return {
                              ...prev,
                              SERVICE: [...prev.SERVICE, event.target.value[0]],
                            };
                          }
                        });
                      }}
                      name="SERVICE"
                    >
                      <MenuItem
                        className="d-flex justify-content-space-between"
                        value="all"
                      >
                        <span>Tất cả</span>
                        <span>
                          <Checkbox
                            checked={
                              dataFilter.SERVICE.length === MENU.SERVICE.length
                            }
                          />
                        </span>
                      </MenuItem>
                      {MENU.SERVICE.map((title: string, index: number) => {
                        return (
                          <MenuItem
                            className="d-flex justify-content-space-between"
                            key={index}
                            value={title}
                          >
                            <span>{title}</span>
                            <span>
                              <Checkbox
                                checked={dataFilter.SERVICE.includes(title)}
                              />
                            </span>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </th>
                  <th>
                    <span> Thời gian cấp</span>
                  </th>
                  <th className="p-0">
                    <Select
                      sx={[
                        {
                          '&': {
                            width: '100%',
                            backgroundColor: 'transparent',
                          },
                        },
                        {
                          '& .MuiSelect-select': {
                            color: '#FFF',
                            fontWeight: '700',
                          },
                        },
                        {
                          '& .MuiSvgIcon-root': {
                            color: '#FFF',
                          },
                        },
                        {
                          '& fieldset': { border: '0' },
                        },
                      ]}
                      onChange={(event: SelectChangeEvent) => {
                        handleFilterData(event);
                      }}
                      defaultValue="0"
                      value="0"
                      name="STATUS"
                    >
                      <MenuItem className="d-none" value={0} disabled>
                        Tình trạng
                      </MenuItem>
                      <MenuItem value="all">Tất cả</MenuItem>
                      {MENU.STATUS.map((title: string, index: number) => {
                        return (
                          <MenuItem key={index} value={title}>
                            {title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </th>
                  <th className="p-0">
                    <Select
                      sx={[
                        {
                          '&': {
                            width: '100%',
                            backgroundColor: 'transparent',
                          },
                        },
                        {
                          '& .MuiSelect-select': {
                            color: '#FFF',
                            fontWeight: '700',
                          },
                        },
                        {
                          '& .MuiSvgIcon-root': {
                            color: '#FFF',
                          },
                        },
                        {
                          '& fieldset': { border: '0' },
                        },
                      ]}
                      onChange={(event: SelectChangeEvent) => {
                        handleFilterData(event);
                      }}
                      defaultValue="0"
                      value="0"
                      name="SOURCE"
                    >
                      <MenuItem className="d-none" value={0} disabled>
                        Nguồn cấp
                      </MenuItem>
                      <MenuItem value="all">Tất cả</MenuItem>
                      {MENU.SOURCE.map((title: string, index: number) => {
                        return (
                          <MenuItem key={index} value={title}>
                            {title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPageData?.map((sequence, index) => {
                  return (
                    <tr key={sequence.id}>
                      <td>
                        <span>
                          20100{sequence.data.stt}
                          {index}
                        </span>
                      </td>
                      <td>
                        <span>{sequence.data.service_name}</span>
                      </td>
                      <td>
                        <span>
                          {formatTimeStampToTime(
                            sequence.data.timestamp_start.seconds,
                            'HH:mm',
                          )}
                          {' - '}
                          {formatTimeStampToDate(
                            sequence.data.timestamp_start.seconds,
                            'DD/MM/YYYY',
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
                    </tr>
                  );
                })}
                {/* <tr>
                  <td>
                    <span>{sequence.data.stt}{index}</span>
                  </td>
                  <td>
                    <span>{sequence.data.service}</span>
                  </td>
                  <td>
                    <span>{sequence.data.time}</span>
                  </td>
                  <td>
                    <span>{sequence.data.status}</span>
                  </td>
                  <td>
                    <span>{sequence.data.source}</span>
                  </td>
                </tr> */}
              </tbody>
            </table>

            <div className={cx('service-btn-container')}>
              <button onClick={handleConvertDataExcel}>
                <span>
                  <AddBoxIcon />
                </span>
                <span>Tải về</span>
              </button>
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

export default ReportList;
