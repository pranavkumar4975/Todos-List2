import React, { useEffect, useState } from "react";
import Todoitem from "./Todoitem";
import { doc, deleteDoc } from "firebase/firestore";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Todos() {
  let myStyle = {
    minHeight: "70vh",
    margin: "40px auto",
  };

  let [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const user = useSelector(selectUser);

  const onDelete = async (title, desc, id) => {
    await addDoc(collection(db, "bin"), {
      email: user.email,
      Title: title,
      description: desc,
      timestamp: serverTimestamp(),
    });

    await deleteDoc(doc(db, "todos", id));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!title || !desc) {
      return alert("Title or Description Can't be empty");
    }

    console.log("I am adding this todo", title, desc);

    await addDoc(collection(db, "todos"), {
      email: user.email,
      Title: title,
      description: desc,
      timestamp: serverTimestamp(),
    });

    setTitle("");
    setDesc("");
  };

  useEffect(() => {
    const queryString = query(collection(db, "todos"), orderBy("timestamp"));
    onSnapshot(queryString, (snapshot) => {
      console.log(snapshot);
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  let ct = 0;

  return (
    <>
      <div className="container my-3">
        <h3>Add a Todo</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Todo Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Todo Description
            </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="form-control"
              id="desc"
            />
          </div>
          <button type="submit" className="btn btn-sm btn-success">
            Add Todo
          </button>
        </form>
      </div>
      <div className="container" style={myStyle}>
        <h3 className="my-3">Todos List</h3>
        {todos.length === 0
          ? ""
          : todos.map(({ id, data: { email, Title, description } }) => {
              console.log(id);
              return (
                <>
                  {email === user?.email
                    ? ((ct = ct + 1),
                      (
                        <Todoitem
                          key={id}
                          title={Title}
                          desc={description}
                          onDelete={onDelete}
                          id={id}
                        />
                      ))
                    : ""}
                </>
              );
            })}
        {ct === 0 ? "No Todos to display" : ""}
      </div>
    </>
  );
}

export default Todos;
