import React from "react";

interface TextareaTs {
  name: string;
  classNameInput: string;
  classNameLabel?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
  text?: string;
}

const TextareaValue = React.memo(({  name, text, classNameLabel, classNameInput, value, onChange }: TextareaTs) => {
  return (
    <label className={classNameLabel}>
      {text}
      <textarea required  name={name} className={classNameInput} value={value} onChange={onChange} />
    </label>
  );
})

export default TextareaValue;
