import React, { useState } from "react";
import "./Login.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import { auth } from "./firebase";

function Login() {
  const user = useSelector(selectUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );
      })
      .catch((error) => alert(error));
  };

  const register = () => {
    if (!email) {
      return alert("please enter a Username!");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <div className="login__items">
        <div className="login__sign">
          <form>
            <p>Sign In</p>
            <div className="login__user">
              <h4>USERNAME</h4>
              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login__pwd">
              <h4>PASSWORD</h4>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" onClick={loginToApp}>
              Sign In
            </button>
          </form>
        </div>
        <div className="login__register">
          <div className="sign__items">
            <h1>Welcome To Login</h1>
            <p>Don't have an account?</p>
            <button onClick={register}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
