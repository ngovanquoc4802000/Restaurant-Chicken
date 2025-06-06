interface InputTs {
  type: string;
  name?: string;
  placeholder?:string;
  classNameInput: string;
  classNameLabel?: string;
  defaultValue?:string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
  text?: string;
}

function InputValue({ defaultValue,placeholder,type, name, text, classNameLabel, classNameInput, value, onChange }: InputTs) {
  return (
    <label className={classNameLabel}>
      {text}
      <input defaultValue={defaultValue} required placeholder={placeholder} type={type} name={name} className={classNameInput} value={value} onChange={onChange} />
    </label>
  );
}

export default InputValue;
