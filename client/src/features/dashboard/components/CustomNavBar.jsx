import React from "react";
import { Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectAuth } from "../../auth/authSlice";

const CustomNavBar = () => {
  let dispatch = useDispatch();
  let auth = useSelector(selectAuth);
  return (
    // <Navbar bg="dark" variant="dark">
    //   <Navbar.Brand className="p-2">Retrospective Wall</Navbar.Brand>
    //   <Navbar.Toggle />
    //   <Navbar.Collapse className="justify-content-end p-2">
    //     <Navbar.Text>
    //       Logged in as: {auth.name}
    //       <span className="logout-text" onClick={() => dispatch(logOut())}>
    //         (Logout)
    //       </span>
    //     </Navbar.Text>
    //   </Navbar.Collapse>
    // </Navbar>
    <div className="custom-navbar">
      <h3 className="custom-navbar-title">Retrospective Wall</h3>
      <div className="custom-navbar-right">
        <span className="user-info">Logged in as: {auth.name} &nbsp;</span>
        <span className="logout-text" onClick={() => dispatch(logOut())}>
          (Logout)
        </span>
      </div>
    </div>
  );
};

export default CustomNavBar;
