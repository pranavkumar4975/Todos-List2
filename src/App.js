import "./App.css";
import Header from "./My Components/Header";
import Todos from "./My Components/Todos";
import Footer from "./My Components/Footer";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./My Components/About";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./My Components/firebase";
import Login from "./My Components/Login";
import Deleted from "./My Components/Deleted";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );
      } else {
        // user is logged out
        dispatch(logout());
      }
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <>
                    <Login />
                  </>
                ) : (
                  <>
                    <Header title="My Todo List" search={true} />
                    <Todos />
                    <Footer />
                  </>
                )}
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <Header title="My Todo List" search={true} />
                <About />
                <Footer />
              </>
            }
          />

          <Route
            path="/deleted"
            element={
              <>
                <Header title="My Todo List" search={true} />
                <Deleted />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
