import React, { type CSSProperties } from "react";
interface ButtonTs {
  text?: string;
  type?: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  style?: CSSProperties | undefined;
  disabled?: boolean | undefined;
  key?: React.Key | null | undefined;
  classNameLogic?: string | undefined;
}

const Button = React.memo(({ text, disabled, type, onClick, style, className }: ButtonTs) => {
  return (
    <button style={style} disabled={disabled} type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
});

export default Button;
