const InputField = ({
  label = "",
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  isTextArea = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-2lg font-bold">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          className="input-style h-[282px]"
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="input-style"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;
