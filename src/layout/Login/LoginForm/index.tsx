/** @format */

import { useState, useEffect } from 'react';
import { User } from '~/services/api';
import { ErrorOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/store';
import { fetchUserList } from '~/features/userSlice';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

interface FormProps {
  username: string;
  password: string;
  email: string;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.user.data);
  console.log(userData);
  const [error, setError] = useState<string>('');
  const [formValue, setFormValue] = useState<FormProps>({
    username: '',
    password: '',
    email: '',
  });

  const moveToForgotPassword = (): void => {
    navigate('/forgot-password');
  };

  const handleFetchData = (): void => {
    dispatch(fetchUserList());
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const checkLogin = userData.some(
      (item) =>
        item.data.username === formValue.username &&
        item.data.password === formValue.password,
    );

    if (checkLogin) {
      setError('');
      navigate('/');
    } else {
      setError('Sai mật khẩu hoặc tên đăng nhập');
      setFormValue((prev) => ({ ...prev, password: '' }));
    }
  };

  return (
    <form className={cx('wrapper')} onSubmit={handleSubmit}>
      <div className={cx('username')}>
        <label htmlFor="">Tên đăng nhập</label>
        <input
          required
          className={cx({ error: error })}
          type="text"
          name="username"
          value={formValue.username}
          onChange={handleInputChange}
        />
      </div>
      <div className={cx('password')}>
        <label htmlFor="">Mật khẩu</label>
        <input
          required
          className={cx({ error: error })}
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleInputChange}
        />
      </div>

      {error.length < 1 ? (
        <p>
          <span
            onClick={() => moveToForgotPassword()}
            className={cx('password-forgot')}
          >
            Quên mật khẩu?
          </span>
        </p>
      ) : (
        <p className={cx('login-error')}>
          <ErrorOutline /> <span>{error}</span>
        </p>
      )}

      <Button type="submit" className={cx('submit-button', 'text-center')}>
        Đăng nhập
      </Button>

      {error.length > 0 && (
        <span
          onClick={() => moveToForgotPassword()}
          className={cx('password-forgot', 'text-center')}
        >
          Quên mật khẩu?
        </span>
      )}
    </form>
  );
};

export default LoginForm;
