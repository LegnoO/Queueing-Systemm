/** @format */

import React, { useEffect, useState } from 'react';
import styles from './DeviceList.module.scss';
import { Select, SelectChangeEvent, MenuItem } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import classNames from 'classnames/bind';
import { fetchDevice } from '~/services/api';
import { DeviceListType } from '~/types/Api';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '~/app/store';
import { fetchDeviceStart } from '~/features/deviceSlice';
import Header from '~/layout/Header';
import { pathType } from '~/types/Header';
import { truncateString } from '~/util/truncateString';
import DeviceDetail from '../DeviceDetail/index';
const cx = classNames.bind(styles);

interface DeviceFilter {
  MENU_ACTIVE: string[];
  MENU_CONNECT: string[];
  SEARCH_TERM: '';
}
const DeviceList = () => {
  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };
  const [dataFilter, setDataFilter] = useState<DeviceFilter>({
    MENU_ACTIVE: ['Hoạt động', 'Ngưng hoạt động'],
    MENU_CONNECT: ['Kết nối', 'Mất kết nối'],
    SEARCH_TERM: '',
  });
  const [data, setData] = useState<DeviceListType[]>([]);
  const [expand, setExpand] = useState<boolean>(false);
  const [checkID, setCheckID] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const CONTENT_TITLES: pathType[] = [
    { text: 'Thiết bị' },
    { text: 'Danh sách thiết bị' },
  ];

  const MENU_ACTIVE = ['Tất cả', 'Hoạt động', 'Ngưng hoạt động'];
  const MENU_CONNECT = ['Tất cả', 'Kết nối', 'Mất kết nối'];
  const deviceData = useAppSelector((state) => state.device.data);
  console.log(deviceData);
  // const result = await fetchDevice()
  // dispatch(fetchDeviceSuccess(result));
  const handleFetchData = (): void => {
    dispatch(fetchDevice());
  };

  const handleFilterData = (event: SelectChangeEvent) => {
    type ObjectWithIndex = {
      [key: string]: string[];
    };

    const object: ObjectWithIndex = {
      MENU_ACTIVE: MENU_ACTIVE,
      MENU_CONNECT: MENU_CONNECT,
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
      deviceData.filter((device: DeviceListType) => {
        return (
          dataFilter.MENU_CONNECT.includes(device.data.connect_status) &&
          dataFilter.MENU_ACTIVE.includes(device.data.active_status)
        );
      }),
    );
  }, [deviceData, dataFilter]);

  const handleMoveToDetail = (id: string): void => {
    const deviceDetail = deviceData.filter(
      (device: DeviceListType) => device.id === id,
    );

    navigate('/device-detail', { state: { device: deviceDetail } });
  };

  const handleMoveToUpdate = (id: string): void => {
    const deviceDetail = deviceData.filter(
      (device: DeviceListType) => device.id === id,
    );

    navigate('/device-update', { state: { device: deviceDetail } });
  };

  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div onClick={() => {}} className={cx('wrapper')}>
        <h3 className={cx('header-title')}>Danh sách thiết bị</h3>
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
              <label>Trạng thái kết nối</label>
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
                defaultValue="Tất cả"
                onChange={(event: SelectChangeEvent) => {
                  handleFilterData(event);
                }}
                name="MENU_CONNECT"
              >
                {MENU_CONNECT.map((title: string, index: number) => {
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
              <input />
            </div>
          </div>

          <div className={cx('list-container')}>
            <table className={cx('list-table')}>
              <thead>
                <tr>
                  <th>Mã thiết bị</th>
                  <th>Tên thiết bị</th>
                  <th>Địa chỉ IP</th>
                  <th>Trạng thái hoạt động</th>
                  <th>Trạng thái kết nối</th>
                  <th>Dịch vụ sử dụng</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((device) => {
                  return (
                    <tr key={device.id}>
                      <td>
                        <span>{device.data.device_name}</span>
                      </td>
                      <td>
                        <span>{device.data.device_name}</span>
                      </td>
                      <td>
                        <span>{device.data.ip}</span>
                      </td>
                      <td>
                        <p className={cx('status')}>
                          <span className={cx('circle-icon')}>
                            <CircleIcon color="success" />
                          </span>
                          <span>{device.data.active_status}</span>
                        </p>
                      </td>
                      <td>
                        <p className={cx('status')}>
                          <span className={cx('circle-icon')}>
                            <CircleIcon color="error" />
                          </span>
                          <span>{device.data.connect_status}</span>
                        </p>
                      </td>
                      <td
                        className={cx('service-usage', {
                          expanding: checkID === device.id && expand,
                        })}
                      >
                        <span
                          onClick={() => {
                            setExpand(false);
                          }}
                          className={cx({
                            expanded: checkID === device.id && expand,
                          })}
                        >
                          {checkID === device.id && expand
                            ? device.data.service_usage
                            : truncateString(device?.data.service_usage, 33)}
                        </span>

                        <span
                          onClick={() => {
                            setCheckID(device.id);
                            console.log(device.id);
                            setExpand(true);
                          }}
                          className={cx('text-underline', 'pointer')}
                        >
                          Xem thêm
                        </span>
                      </td>
                      <td>
                        <span
                          onClick={() => {
                            handleMoveToDetail(device.id);
                          }}
                          className={cx('text-underline', 'pointer')}
                        >
                          Chi tiết
                        </span>
                      </td>
                      <td>
                        <span
                          onClick={() => {
                            handleMoveToUpdate(device.id);
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
            <Link to="/device-add">
              <button className={cx('add-service-button')}>
                <span>
                  <AddBoxIcon />
                </span>
                <span>Thêm thiết bị</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceList;
