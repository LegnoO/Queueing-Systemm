/** @format */

import Sidebar from "../../layout/Sidebar";

import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
}

const index: React.FC<Props> = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Sidebar />
      <div className={cx("content")}>{children}</div>
    </div>
  );
};

export default index;
