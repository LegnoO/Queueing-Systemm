import { addService } from '~/services/api';
import { useAppDispatch } from '~/app/store';
import { Service } from '~/types/Api';
import { pathType } from '~/types/Header';
import { useState } from 'react';
import { Checkbox } from '@mui/material';
import styles from './ServiceAdd.module.scss';
import classNames from 'classnames/bind';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Header from '~/layout/Header';
const cx = classNames.bind(styles);

const ServiceAdd = () => {
  const dispatch = useAppDispatch();
  
  const [dataForm, setDataForm] = useState<Service>({
    service_id: '',
    describe: '',
    service_name: '',
    auto_increase: false,
    prefix: false,
    surfix: false,
    reset: false,
  });
  const CONTENT_TITLES: pathType[] = [
    { text: 'Dịch vụ' },
    { text: 'Danh sách dịch vụ', to: '/service-list' },
    { text: 'Thêm dịch vụ' },
  ];

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;

    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
                'gap-6',
                'flex-nowrap',
                'mb-7',
              )}
            >
              <div className={cx('form-field', 'col-2')}>
                <label>Mã dịch vụ</label>
                <Input
                  onChange={handleChangeData}
                  name="service_id"
                  className="w-100"
                />
                <label>Tên dịch vụ</label>
                <Input
                  onChange={handleChangeData}
                  name="service_name"
                  className="w-100"
                />
              </div>
              <div className={cx('form-field', 'col-2')}>
                <label>Mô tả</label>
                <textarea
                  onChange={handleChangeData}
                  name="describe"
                  className="w-100 h-100"
                />
              </div>
            </div>

            <h4 className={cx('title')}>Quy tắc cấp số</h4>
            <div className={cx('form-rule', 'd-flex', 'flex-column', 'gap-5')}>
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setDataForm((prev) => ({
                        ...prev,
                        auto_increase: event.target.checked,
                      }));
                    }}
                  />
                  <h6>Tăng tự động từ:</h6>
                </div>
                <div className="col d-flex align-items-center gap-3">
                  <div className={cx('box-number')}>0001</div>
                  <h6>Đến</h6>
                  <div className={cx('box-number')}>9999</div>
                </div>
              </div>

              <div
                className={cx('form-rule-item', 'd-flex', 'align-items-center')}
              >
                <div className="col-2 d-flex align-items-center">
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setDataForm((prev) => ({
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setDataForm((prev) => ({
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setDataForm((prev) => ({
                        ...prev,
                        reset: event.target.checked,
                      }));
                    }}
                  />
                  <h6>Reset mỗi ngày</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('action-button')}>
          <Button to="/service-list" className={cx('action-button__cancel')}>
            Hủy bỏ
          </Button>
          <Button
            onClick={() => {
              addService(dataForm);
            }}
            to="/service-list"
            className={cx('action-button__primary')}
          >
            Thêm dịch vụ
          </Button>
        </div>
      </div>
    </>
  );
};

export default ServiceAdd;
