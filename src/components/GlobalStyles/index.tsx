/** @format */

import './GlobalStyles.scss';
import './Pagination.scss';

interface Props {
  children: React.ReactNode;
}

const GlobalStyles: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default GlobalStyles;
