interface ButtonTs {
  text?: string;
  type?: "submit" | "button" ;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  key?: React.Key | null | undefined;
  classNameLogic?: string | undefined;
}

function Button({ text, type, onClick, className }: ButtonTs) {
  return (
    <>
      <button type={type} className={className} onClick={onClick} >{text}</button>
    </>
  );
}

export default Button;