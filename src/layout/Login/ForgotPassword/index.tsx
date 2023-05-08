/** @format */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import { fetchUser, User } from "~/services/api";
import { ErrorOutline } from "@mui/icons-material";
const cx = classNames.bind(styles);

interface FormProps {
  email: string;
}

const ForgotPassword = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [formValue, setFormValue] = useState<FormProps>({
    email: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      const result: User[] = await fetchUser();
      setUserData(result);
    };

    getUserData();
  }, []);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const checkEmail = userData.some(
      (item) => item.data.email === formValue.email
    );

    if (checkEmail) {
      const dataId = userData.filter(
        (data, index) => data.data.email === formValue.email
      );
      console.log(dataId);
      navigate("/", { state: { message: dataId } });
      setError("");
    } else {
      setError("Email không tồn tại !");
      setFormValue((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <form className={cx("wrapper")} onSubmit={handleSubmit}>
      <div className={cx("email")}>
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
        <p className={cx("login-error")}>
          <ErrorOutline /> <span>{error}</span>
        </p>
      )}

      <div className={cx("action")}>
        <Button to="/login" className={cx("cancel-button", "text-center")}>
          Hủy
        </Button>
        <Button type="submit" className={cx("submit-button", "text-center")}>
          Tiếp tục
        </Button>
      </div>
    </form>
  );
};

export default ForgotPassword;
