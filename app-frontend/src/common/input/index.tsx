import React from "react";

interface InputTs {
  type: string;
  name?: string;
  placeholder?: string;
  classNameInput?: string;
  classNameLabel?: string;
  defaultValue?: string;
  id?: string;
  htmlFor?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  text?: string;
}

const InputValue = React.memo(
  ({
    htmlFor,
    id,
    defaultValue,
    placeholder,
    type,
    name,
    text,
    classNameLabel,
    classNameInput,
    value,
    onChange,
  }: InputTs) => {
    return (
      <label htmlFor={htmlFor} className={classNameLabel}>
        {text}
        <input
          id={id}
          defaultValue={defaultValue}
          required
          placeholder={placeholder}
          type={type}
          name={name}
          className={classNameInput}
          value={value}
          onChange={onChange}
        />
      </label>
    );
  }
);

export default InputValue;
