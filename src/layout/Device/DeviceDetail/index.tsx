/** @format */

import styles from './DeviceDetail.module.scss';
import AddBoxIcon from '@mui/icons-material/AddBox';
import classNames from 'classnames/bind';
import Header from '~/layout/Header';
import { pathType } from '~/types/Header';
import { Link, useLocation } from 'react-router-dom';
const cx = classNames.bind(styles);

const DeviceDetail = () => {
  const CONTENT_TITLES: pathType[] = [
    { text: 'Thiết bị' },
    { text: 'Danh sách thiết bị', to: '/device' },
    { text: 'Chi tiết thiết bị' },
  ];
  const location = useLocation();
  const deviceData = location.state.device[0];

  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <h3>Quản lý thiết bị</h3>
        <div className={cx('inner')}>
          <div className={cx('content')}>
            <h4>Thông tin thiết bị</h4>
            <div className={cx('body')}>
              <div>
                <div>
                  <span>Mã thiết bị</span>
                  <span>{deviceData.data.device_id}</span>
                </div>
                <div>
                  <span>Tên thiết bị</span>
                  <span>{deviceData.data.device_name}</span>
                </div>
                <div>
                  <span>Địa chỉ IP</span>
                  <span>{deviceData.data.ip}</span>
                </div>
              </div>
              <div>
                <div>
                  <span>Loại thiết bị</span>
                  <span>{deviceData.data.device_type}</span>
                </div>
                <div>
                  <span>Tên đăng nhập:</span>
                  <span>{deviceData.data.username}</span>
                </div>
                <div>
                  <span>Mật khẩu</span>
                  <span>{deviceData.data.password}</span>
                </div>
              </div>
            </div>
            <div className={cx('bottom')}>
              <h4>Dịch vụ sử dụng:</h4>
              <p>{deviceData.data.service_usage}</p>
            </div>
          </div>

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
    </>
  );
};

export default DeviceDetail;
