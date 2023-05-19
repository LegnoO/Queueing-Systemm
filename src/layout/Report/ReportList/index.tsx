import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/store';
import { Select, SelectChangeEvent, MenuItem, Checkbox } from '@mui/material';
import { fetchSequenceList } from '~/features/sequenceSlice';
import { SequenceListType } from '~/types/Api';
import { formatTimeStampToTime, formatTimeStampToDate } from '~/util/date';
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

const ReportList = () => {
  const [serviceList, setServiceList] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<SequenceListType[]>([]);
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

  const [dataFilter, setDataFilter] = useState<ObjectWithIndex>({
    SERVICE: MENU.SERVICE,
    STATUS: MENU.STATUS,
    SOURCE: MENU.SOURCE,
  });

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
  console.log(dataFilter);

  const handleFetchData = (): void => {
    dispatch(fetchSequenceList());
  };

  useEffect(() => {
    setData(
      sequenceData?.filter((sequence: SequenceListType) => {
        return (
          dataFilter.STATUS.includes(sequence.data.status) &&
          dataFilter.SOURCE.includes(sequence.data.source) &&
          dataFilter.SERVICE.includes(sequence.data.service_name)
        );
      }),
    );
  }, [sequenceData, dataFilter]);

  useEffect(() => {
    handleFetchData();
  }, []);

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
                  value={dayjs()}
                  // onChange={(date) =>
                  //   date &&
                  //   setDataFilter((prev) => ({
                  //     ...prev,
                  //     time: { ...prev.time, start: date.toDate() },
                  //   }))
                  // }
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
                  value={dayjs()}
                  // onChange={(date) =>
                  //   date &&
                  //   setDataFilter((prev) => ({
                  //     ...prev,
                  //     time: { ...prev.time, end: date.toDate() },
                  //   }))
                  // }
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
                  <th className="">
                    Số thứ tự
                    {/* <Select
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
                      name="SERIAL"
                    >
                      <MenuItem className="d-none" value={0} disabled>
                        Số thứ tự
                      </MenuItem>
                      <MenuItem value="all">Tất cả</MenuItem>
                      {MENU.SERIAL.map((title: string, index: number) => {
                        return (
                          <MenuItem key={index} value={title}>
                            {title}
                          </MenuItem>
                        );
                      })}
                    </Select> */}
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
                      // renderValue={(selected: any) => selected.join(',')}
                      multiple
                      onChange={(event: SelectChangeEvent<string[]>) => {
                        // handleFilterData(event);
                        //

                        console.log(event.target.value[0]);
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
                {data?.map((sequence, index) => {
                  return (
                    <tr key={sequence.id}>
                      <td>
                        <span>
                          {sequence.data.stt}
                          {index}
                        </span>
                      </td>
                      <td>
                        <span>{sequence.data.service_name}</span>
                      </td>
                      <td>{/* <span>{sequence.data.time}</span> */}</td>
                      <td>
                        <span>{sequence.data.status}</span>
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
              <button className={cx('')}>
                <span>
                  <AddBoxIcon />
                </span>
                <span>Tải về</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportList;
