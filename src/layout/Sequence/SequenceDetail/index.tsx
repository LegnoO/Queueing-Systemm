import Header from '~/layout/Header';
import { pathType } from '~/types/Header';
import { Link, useParams } from 'react-router-dom';
import styles from './SequenceDetail.module.scss';
import CircleIcon from '@mui/icons-material/Circle';
import classNames from 'classnames/bind';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { SequenceListType } from '~/types/Api';
import { useState, useEffect } from 'react';
import { RouteParams } from '~/types/Route';
import { fetchDataById } from '~/services/api';
const cx = classNames.bind(styles);

const SequenceDetail = () => {
  const { id } = useParams<RouteParams>() as { id: string };
  const [sequenceData, setSequenceData] = useState<
    SequenceListType | undefined
  >();

  const CONTENT_TITLES: pathType[] = [
    { text: 'cấp số' },
    { text: 'Danh sách cấp số', to: '/sequence-list' },
    { text: 'Chi tiết' },
  ];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await fetchDataById('sequence-list', id);
      setSequenceData(result);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <h3 className={cx('header-title')}>Quản lý cấp số</h3>
        <div className={cx('content')}>
          <div className={cx('form-container')}>
            <h4 className={cx('title')}>Thông tin cấp số</h4>
            <div className={cx('sequence-info', 'row')}>
              <div className="col-2">
                <div className="row">
                  <div
                    className={cx(
                      'sequence-info-item',
                      'd-flex',
                      'flex-column',
                      'fw-bold',
                      'me-3',
                    )}
                  >
                    <p>Họ tên:</p>
                    <p>Tên dịch vụ:</p>
                    <p>Số thứ tự:</p>
                    <p>Thời gian cấp:</p>
                    <p>Hạn sử dụng:</p>
                  </div>
                  <div
                    className={cx(
                      'sequence-info-item',
                      'd-flex',
                      'flex-column',
                      'fw-normal',
                    )}
                  >
                    <p>{sequenceData?.data.customer_name}</p>
                    <p>{sequenceData?.data.service_name}</p>
                    <p>{sequenceData?.data.stt}</p>
                    <p>{sequenceData?.data.timestamp_start.seconds}</p>
                    <p>{sequenceData?.data.timestamp_end.seconds}</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div
                    className={cx(
                      'sequence-info-item',
                      'd-flex',
                      'flex-column',
                      'fw-bold',
                      'me-3',
                    )}
                  >
                    <p>Nguồn cấp</p>
                    <p>Trạng thái</p>
                    <p>Số điện thoại</p>
                    <p>Địa chỉ Email</p>
                  </div>
                  <div
                    className={cx(
                      'sequence-info-item',
                      'd-flex',
                      'flex-column',
                      'fw-normal',
                    )}
                  >
                    <p>{sequenceData?.data.source}</p>

                    <p>
                      <span className={cx('circle-icon')}>
                        <CircleIcon
                          color={
                            sequenceData?.data.status === 'Đang chờ'
                              ? 'info'
                              : sequenceData?.data.status === 'Đã sử dụng'
                              ? undefined
                              : sequenceData?.data.status === 'Bỏ qua'
                              ? 'error'
                              : undefined
                          }
                        />
                      </span>
                      {sequenceData?.data.status}
                    </p>
                    <p>{sequenceData?.data.phone}</p>
                    <p>{sequenceData?.data.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('service-container')}>
            <Link to="/sequence-list">
              <button className={cx('')}>
                <span>
                  <AddBoxIcon />
                </span>
                <span>Quay lại</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SequenceDetail;
