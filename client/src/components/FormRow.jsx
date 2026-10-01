const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        {...(value !== undefined ? { value } : defaultValue !== undefined ? { defaultValue } : {})}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={
          type === "email" ? "email" : type === "password" ? "current-password" : "off"
        }
      />
    </div>
  );
};

export default FormRow;
