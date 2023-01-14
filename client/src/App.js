import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import { ToastContainer } from "react-toastify";
import Dashboard from "./features/dashboard/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { authSuccess } from "./features/auth/authSlice";

axios.defaults.withCredentials = true;
function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("id")) {
      dispatch(
        authSuccess({
          name: localStorage.getItem("user"),
          id: localStorage.getItem("id"),
        })
      );
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer limit={1} autoClose={1000} />
    </div>
  );
}

export default App;
