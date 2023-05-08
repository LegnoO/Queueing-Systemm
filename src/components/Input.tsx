/** @format */

interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  disabled?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  onChange,
  icon,
  disabled,
  className,
}) => {
  return (
    <input
      className={className}
      disabled={disabled ? true : false}
      // icon={icon || undefined}
      onChange={onChange || undefined}></input>
  );
};

export default Input;
