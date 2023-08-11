import React, { useEffect, useState } from "react";
import "./Deleted.css";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Todoitem from "./Todoitem";

function Deleted() {
  let [deleted, setDeleted] = useState([]);
  const user = useSelector(selectUser);

  const onDelete = async (title, desc, id) => {
    await deleteDoc(doc(db, "bin", id));
  };

  useEffect(() => {
    const queryString = query(collection(db, "bin"), orderBy("timestamp"));
    onSnapshot(queryString, (snapshot) => {
      console.log(snapshot);
      setDeleted(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  let ct = 0;

  return (
    <div className="deleted">
      <h3>Deleted Todos</h3>
      <div className="deleted__content">
        {deleted.length === 0
          ? ""
          : deleted.map(({ id, data: { email, Title, description } }) => {
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
        {ct === 0 ? "No Item Deleted" : ""}
      </div>
    </div>
  );
}

export default Deleted;
