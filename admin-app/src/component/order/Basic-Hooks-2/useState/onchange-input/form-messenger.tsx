import { SetStateAction, useState } from "react";

export function FormMessenger() {
  const [firstName, setFirstName] = useState("");
  const [isActive, setIsActive] = useState(false);
  if (isActive) {
    return <h1>Thank You!</h1>;
  }
  const handleOnchange = (e: { target: { value: SetStateAction<string> } }) => {
    setFirstName(e.target.value);
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsActive(!isActive);
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        style={{ border: "1px solid black" }}
        onChange={handleOnchange}
        placeholder="Message"
        name=""
        value={firstName}
        id=""
      ></textarea>
      <br />
      <button type="submit">Send</button>
    </form>
  );
}
