const colorClasses = {
  primary: "input-primary focus:ring-primary",
  secondary: "input-secondary focus:ring-secondary",
  accent: "input-accent focus:ring-accent",
  info: "input-info focus:ring-info",
  success: "input-success focus:ring-success",
  warning: "input-warning focus:ring-warning",
  error: "input-error focus:ring-error",
};

const InputBox = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
  required = false,
  disabled = false,
  inputColor = "primary",
}) => {
  const inputColorClass = colorClasses[inputColor];
  return (
    <div>
      {label && (
        <label className="label" htmlFor={name}>
          <span className="label-text font-semibold text-base">{label}</span>
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input ${inputColorClass} w-full focus:outline-none focus:ring-2`}
      />
    </div>
  );
};

export default InputBox;
