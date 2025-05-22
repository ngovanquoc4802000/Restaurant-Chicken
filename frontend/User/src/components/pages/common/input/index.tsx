interface InputTs {
  type: string;
  name: string;
  placeholder?:string;
  classNameInput: string;
  classNameLabel?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
  text?: string;
}

function InputValue({ placeholder,type, name, text, classNameLabel, classNameInput, value, onChange }: InputTs) {
  return (
    <label className={classNameLabel}>
      {text}
      <input required placeholder={placeholder} type={type} name={name} className={classNameInput} value={value} onChange={onChange} />
    </label>
  );
}

export default InputValue;
