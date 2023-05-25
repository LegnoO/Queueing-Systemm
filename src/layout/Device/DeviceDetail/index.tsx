/** @format */

import styles from './DeviceDetail.module.scss';
import AddBoxIcon from '@mui/icons-material/AddBox';
import classNames from 'classnames/bind';
import Header from '~/layout/Header';
import { pathType } from '~/types/Header';
import { useLocation, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const DeviceDetail = () => {
  const navigate = useNavigate();
  const CONTENT_TITLES: pathType[] = [
    { text: 'Thiết bị' },
    { text: 'Danh sách thiết bị', to: '/device-list' },
    { text: 'Chi tiết thiết bị' },
  ];
  const location = useLocation();
  const deviceData = location.state.device[0];
  console.log(deviceData.data);

  const handleMoveToUpdate = (): void => {
    navigate('/device-update', { state: { device: [deviceData] } });
  };

  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <h3 className={cx('header-title')}>Quản lý thiết bị</h3>
        <div className={cx('content')}>
          <div className={cx('form-container')}>
            <h4 className={cx('title')}>Thông tin thiết bị</h4>
            <div className={cx('device-info-top')}>
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
            <div className={cx('device-info-bottom')}>
              <h4>Dịch vụ sử dụng:</h4>
              <p>{deviceData.data.service_usage}</p>
            </div>
          </div>

          <div className={cx('service-btn-container')}>
            <button onClick={handleMoveToUpdate}>
              <span>
                <AddBoxIcon />
              </span>
              <span>Cập nhật thiết bị</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceDetail;
