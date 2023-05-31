import { pathType } from '~/types/Header';
import { useState } from 'react';
import { Checkbox } from '@mui/material';
import { Service } from '~/types/Api';
import { useAppDispatch } from '~/app/store';
import { addService, updateService } from '~/services/api';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ServiceListType } from '~/types/Api';
import { RouteParams } from '~/types/Route';
import { fetchDataById } from '~/services/api';
import Header from '~/layout/Header';
import styles from './ServiceUpdate.module.scss';
import classNames from 'classnames/bind';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

const ServiceUpdate = () => {
  const { id } = useParams<RouteParams>() as { id: string };
  const dispatch = useAppDispatch();
  const [serviceData, setServiceData] = useState<ServiceListType | undefined>();
  const [formData, setFormData] = useState<Service>({
    status: '',
    active_status: '',
    serial: '',
    service_id: '',
    describe: '',
    service_name: '',
    auto_increase: false,
    prefix: false,
    surfix: false,
    reset: false,
  });
  console.log(formData);
  const CONTENT_TITLES: pathType[] = [
    { text: 'Dịch vụ' },
    {
      text: 'Danh sách dịch vụ',
      to: '/service-list',
    },
    {
      text: 'Chi tiết',
      to: `/service-detail/${id}`,
    },
    { text: 'Cập nhật' },
  ];

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await fetchDataById('service-list', id);
      setServiceData(result);
      setFormData(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header path={CONTENT_TITLES} />
      <div className={cx('wrapper')}>
        <h3 className={cx('header-title')}>Quản lý dịch vụ</h3>
        <div className={cx('content')}>
          <div className={cx('form-container')}>
            <h4 className={cx('title')}>Thông tin dịch vụ</h4>

            <div
              className={cx(
                'form-input',
                'row',
                'gap-4',
                'flex-nowrap',
                'mb-3',
              )}
            >
              <div className={cx('form-field', 'col-2')}>
                <label>
                  Mã dịch vụ<span className={cx('warning-require')}>*</span>
                </label>
                <Input
                  onChange={handleChangeData}
                  name="service_id"
                  className="w-100"
                  defaultValue={formData?.service_id}
                />
                <label>Tên dịch vụ<span className={cx('warning-require')}>*</span></label>
                <Input
                  onChange={handleChangeData}
                  name="service_name"
                  className="w-100"
                  defaultValue={formData?.service_name}
                />
              </div>
              <div className={cx('form-field', 'col-2')}>
                <label>Mô tả</label>
                <textarea
                  onChange={handleChangeData}
                  name="describe"
                  className="w-100 h-100"
                  defaultValue={formData?.describe}
                />
              </div>
            </div>

            <h4 className={cx('title')}>Quy tắc cấp số</h4>
            <div className={cx('form-rule', 'd-flex', 'flex-column', 'gap-3')}>
              <div
                className={cx(
                  'form-rule-item',
                  'd-flex',
                  'align-items-center',
                  'justify-content-space-between',
                )}
              >
                <div className="col-2 d-flex align-items-center">
                  <Checkbox
                    checked={formData.auto_increase}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData((prev) => ({
                        ...prev,
                        auto_increase: event.target.checked,
                      }));
                    }}
                  />
                  <h6>Tăng tự động từ:</h6>
                </div>
                <div className="col d-flex align-items-center">
                  <div className={cx('box-number')}>0001</div>
                  <h6 className="mx-2">Đến</h6>
                  <div className={cx('box-number')}>9999</div>
                </div>
              </div>

              <div
                className={cx('form-rule-item', 'd-flex', 'align-items-center')}
              >
                <div className="col-2 d-flex align-items-center">
                  <Checkbox
                    checked={formData.prefix}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData((prev) => ({
                        ...prev,
                        prefix: event.target.checked,
                      }));
                    }}
                  />
                  <h6>Prefix:</h6>
                </div>
                <div className="col d-flex align-items-center">
                  <div className={cx('box-number')}>0001</div>
                </div>
              </div>
              <div
                className={cx('form-rule-item', 'd-flex', 'align-items-center')}
              >
                <div className="col-2 d-flex align-items-center">
                  <Checkbox
                    checked={formData.surfix}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData((prev) => ({
                        ...prev,
                        surfix: event.target.checked,
                      }));
                    }}
                  />
                  <h6>Surfix:</h6>
                </div>
                <div className="col d-flex align-items-center">
                  <div className={cx('box-number')}>0001</div>
                </div>
              </div>
              <div
                className={cx('form-rule-item', 'd-flex', 'align-items-center')}
              >
                <div className="d-flex align-items-center">
                  <Checkbox
                    checked={formData.reset}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData((prev) => ({
                        ...prev,
                        reset: event.target.checked,
                      }));
                    }}
                  />
                  <h6>Reset mỗi ngày</h6>
                </div>
              </div>
            </div>
            <div className="text-muted mt-3">
              <span className={cx('warning-require')}>*</span>Là những thông tin
              bắt buộc
            </div>
          </div>
        </div>
        <div className={cx('action-button')}>
          <Button to="/service-list" className={cx('action-button__cancel')}>
            Hủy bỏ
          </Button>
          <Button
            to="/service-list"
            onClick={() => {
              // updateService(serviceData.id, formData);
            }}
            className={cx('action-button__primary')}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </>
  );
};

export default ServiceUpdate;
