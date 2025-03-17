import { useState } from "react";

export function CheckBox() {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <label htmlFor="">
        <input type="checkbox" name="checkbox" onChange={(e) => setChecked(e.target.checked)} />
      </label>
      <p>You {checked ? "liked" : "did not like"} this</p>
    </>
  );
}
