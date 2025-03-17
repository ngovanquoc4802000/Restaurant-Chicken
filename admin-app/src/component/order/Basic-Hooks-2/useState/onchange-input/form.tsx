import { SetStateAction, useState } from "react";

export function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleFirst = (e: { target: { value: SetStateAction<string> } }) => {
    setFirstName(e.target.value);
  };
  const handleLast = (e: { target: { value: SetStateAction<string> } }) => {
    setLastName(e.target.value);
  };
  const handleReset = () => {
    setFirstName("");
    setLastName("");
  };
  return (
    <>
      <input style={{ border: "1px solid black" }} onChange={handleFirst} type="text" name="firstName" value={firstName} />
      <input style={{ border: "1px solid black" }} onChange={handleLast} type="text" name="firstName" value={lastName} />
      <h1>
        Hi, {firstName} {lastName}
      </h1>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
