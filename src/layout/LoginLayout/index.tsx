/** @format */

import { images } from "~/assets/images";
import styles from "./LogintLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
}

const index: React.FC<Props> = ({ children }) => {
  const currentUrl = window.location.href;
  const isLoginPage = currentUrl.includes('/login');
  
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("content-left")}>
          <div className={cx("content-left__header")}>
            <img className={cx("logo")} alt="logo" src={images.logo} />
          </div>
          <div className={cx("content-left__content")}>{children}</div>
        </div>
        <div className={cx("content-right")}>
          <img className={cx("admin-bg")} alt="logo" src={images.admin_bg} />
          <div className={cx("content-right__title")}>
            <h4>Hệ thống</h4>
            <h2>QUẢN LÝ XẾP HÀNG</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
