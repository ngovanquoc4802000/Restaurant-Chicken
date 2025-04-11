import "./button.css";
interface ActionButtonProps {
  action: "create" | "delete" | "edit" | "read";
  onClick?: () => void;
}

let buttonText: string;
let buttonClassName: string;
const Button = ({ action, onClick }: ActionButtonProps) => {
  switch (action) {
    case "create":
      buttonText = "Create";
      buttonClassName = "create-button";
      break;
    case "edit":
      buttonText = "Edit";
      buttonClassName = "edit-button";
      break;
    case "read":
      buttonText = "Read";
      buttonClassName = "read-button";
      break;
    case "delete":
      buttonText = "Delete";
      buttonClassName = "delete-button";
      break;
    default:
      buttonText = "not font";
      buttonClassName = "not className";
      break;
  }
  return (
    <button className={`action-button ${buttonClassName}`} onClick={onClick}>
      {buttonText}
    </button>
  );
};
export default Button;
