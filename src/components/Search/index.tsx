/** @format */
import SearchIcon from '@mui/icons-material/Search';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import Input from '../Input';
const cx = classNames.bind(styles);

interface SearchProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  disabled?: string;
  className?: string;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({
  onChange,
  icon,
  disabled,
  className,
  placeholder,
}) => {
  return (
    <div className={cx('wrapper')}>
      <Input
        placeholder={placeholder || undefined}
        className={className}
        // icon={icon || undefined}
        onChange={onChange || undefined}
      />
      <span>
        <SearchIcon />
      </span>
    </div>
  );
};

export default Search;
