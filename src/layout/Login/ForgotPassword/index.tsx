/** @format */
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '~/firebase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { fetchUser, User } from '~/services/api';
import { ErrorOutline } from '@mui/icons-material';
const cx = classNames.bind(styles);

interface FormProps {
  email: string;
  new_password?: string;
  confirm_password?: string;
  new_confirm_password?: string;
  id?: string;
}

const ForgotPassword = () => {
  const [checkPassWord, setCheckPassWord] = useState<boolean>(false);
  const [userData, setUserData] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [formValue, setFormValue] = useState<FormProps>({
    email: '',
    new_password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValue((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formValue);

  const handleChangePassword = () => {
    if (
      formValue.id &&
      formValue.new_password === formValue.new_confirm_password
    ) {
      updateDoc(doc(db, 'users', formValue.id), {
        password: formValue.new_password,
      });
      navigate('/');
    } else {
      setFormValue((prev) => ({ ...prev, new_confirm_password: '' }));
      setError('Mật khẩu không trùng khớp');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const checkEmail = userData.some(
      (item) => item.data.email === formValue.email,
    );

    if (checkEmail) {
      const dataId = userData.filter(
        (data) => data.data.email === formValue.email,
      );

      setFormValue((prev) => ({ ...prev, id: dataId[0].id }));

      setCheckPassWord(true);
      setError('');
    } else {
      setError('Email không tồn tại !');
      setFormValue((prev) => ({ ...prev, password: '' }));
    }
  };

  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      const result: User[] = await fetchUser();
      setUserData(result);
    };

    getUserData();
  }, []);

  return (
    <>
      {!checkPassWord ? (
        <form className={cx('wrapper')} onSubmit={handleSubmit}>
          <div className={cx('email')}>
            <h2 className="text-center">Đặt lại mật khẩu</h2>
            <label htmlFor="">
              Vui lòng nhập email để đặt lại mật khẩu của bạn
            </label>
            <input
              className={cx({ error: error })}
              type="text"
              name="email"
              value={formValue.email}
              onChange={handleInputChange}
            />
          </div>

          {error.length > 0 && (
            <p className={cx('login-error')}>
              <ErrorOutline /> <span>{error}</span>
            </p>
          )}

          <div className={cx('action')}>
            <Button to="/login" className={cx('cancel-button', 'text-center')}>
              Hủy
            </Button>
            <Button
              type="submit"
              className={cx('submit-button', 'text-center')}
            >
              Tiếp tục
            </Button>
          </div>
          {error.length > 0 && (
            <p className={cx('login-error')}>
              <ErrorOutline /> <span>{error}</span>
            </p>
          )}
        </form>
      ) : (
        <form className={cx('wrapper')} onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-2 mb-2">
            <label htmlFor="">Mật khẩu</label>
            <input
              required
              className={cx({ error: error })}
              type="password"
              name="new_password"
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="">Nhập lại mật khẩu</label>
            <input
              required
              className={cx({ error: error })}
              type="password"
              name="new_confirm_password"
              onChange={handleInputChange}
            />
          </div>

          <div className={cx('action')}>
            <Button
              className={cx('submit-button', 'text-center')}
              onClick={() => handleChangePassword()}
            >
              Xác nhận
            </Button>
          </div>

          {error.length > 0 && (
            <p className={cx('login-error')}>
              <ErrorOutline /> <span>{error}</span>
            </p>
          )}
        </form>
      )}
    </>
  );
};

export default ForgotPassword;
