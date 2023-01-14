import React, { useState, useEffect } from "react";
import "./Auth.css";
import { Form, Button, Card, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signinUser, selectAuth } from "./authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  let [validate, setValidate] = useState(false);
  let nav = useNavigate();
  const auth = useSelector(selectAuth);
  let [loginState, setLoginState] = useState({ email: "", password: "" });
  let changeHandler = (e) =>
    setLoginState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  let submitHandler = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (!form.checkValidity()) {
      setValidate(true);
    } else {
      dispatch(signinUser(loginState));
    }
  };

  useEffect(() => {
    if (auth.value) nav("/dashboard");
  }, [auth.value]);

  return (
    <div className="auth-container">
      <Card className="m-3 auth-card">
        <Card.Body>
          <Card.Text as="h1" className="mb-3">
            LOG IN
          </Card.Text>
          <Form noValidate validated={validate} onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="formBasicEmail"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={loginState.email}
                  onChange={changeHandler}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Email a valid Email
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="formBasicPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginState.password}
                  onChange={changeHandler}
                  minLength={5}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password must be atleast 5 characters
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
            <div className="mt-2">
              New User?{" "}
              <Link to="/signup" className="text-center">
                Click here to Register
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
