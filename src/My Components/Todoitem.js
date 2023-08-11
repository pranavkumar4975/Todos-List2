import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Todoitem({ title, desc, id, onDelete }) {
  const user = useSelector(selectUser);
  // const todoitem = {
  //   border: "2px solid green",
  //   marginbottom: "10px",
  // }
  return (
    <div>
      <h4>{title}</h4>

      <p>desc: {desc}</p>

      <button
        className="btn btn-sm btn-danger"
        onClick={() => {
          onDelete(title, desc, id);
        }}
      >
        delete
      </button>
      <hr />
    </div>
  );
}

export default Todoitem;
