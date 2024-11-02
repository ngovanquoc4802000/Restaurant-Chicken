import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  return (
    <div className="category">
    {/*   <form className="FormFields" onSubmit={handlFormUpdate}>
        <label htmlFor="">
          Name
          <input value={value.name} onChange={onChangeUpdate} name="name" type="text" />
        </label>
        <br />
        <label htmlFor="">
          Handle
          <input onChange={onChangeUpdate} name="handle" type="text" />
        </label>
        <br />
        <label htmlFor="">
          Email
          <input  onChange={onChangeUpdate} name="email" type="email" />
        </label>
        <br />
        <label htmlFor="">
          Address
          <input onChange={onChangeUpdate} name="address" type="address" />
        </label>
        <br />
        <button className="Submit"  >
          Submit
        </button>
        <button className="Back"  >
          Back
        </button>
      </form>; */}
    </div>
  );
}

export default Update;