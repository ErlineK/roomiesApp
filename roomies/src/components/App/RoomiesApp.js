import React, { useContext } from "react";
import "./app.scss";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/utils/AuthContext";

export default function () {
  const { isLoggedIn } = useContext(AuthContext);

  console.log("Roomies app is called");

  return (
    <div>
      {isLoggedIn() ? <Redirect to="/UserHome" /> : <Redirect to="/" />}
    </div>
  );
}
