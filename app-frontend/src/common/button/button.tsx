import React from "react";
import "./button.css";
interface ActionButtonProps {
  action: "create" | "delete" | "edit" | "read" | "save" | "cancel" | "showDetails" | "deactivate" | "update" | "Đóng";
  onClick?: () => void;
  buttonText?: string;
  disable?: boolean;
}

let buttonClassName: string;
const Button = React.memo(({ action, onClick, buttonText, disable }: ActionButtonProps) => {
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
    case "save":
      buttonText = "Save";
      buttonClassName = "save-button";
      break;
    case "cancel":
      buttonText = "Cancel";
      buttonClassName = "cancel-button";
      break;
    case "showDetails":
      buttonText = "Details";
      buttonClassName = "showDetails-button";
      break;
    case "deactivate":
      buttonText = "Deactivate";
      buttonClassName = "deactivate-button";
      break;
    default:
      buttonText = "not font";
      buttonClassName = "not className";
      break;
  }
  return (
    <button disabled={disable} type="submit" className={`action-button ${buttonClassName}`} onClick={onClick}>
      {buttonText}
    </button>
  );
});
export default Button;
