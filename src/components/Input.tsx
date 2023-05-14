/** @format */
interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  disabled?: string;
  className?: string;
  name?: string;
  defaultValue?:string;
}

const Input: React.FC<InputProps> = ({
  onChange,
  icon,
  disabled,
  className,
  name,
  defaultValue,
}) => {
  return (
    <input
      className={className}
      disabled={disabled ? true : false}
      // icon={icon || undefined}
      defaultValue={defaultValue}
      name={name}
      onChange={onChange || undefined}
    ></input>
  );
};

export default Input;
