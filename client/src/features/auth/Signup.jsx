import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, selectAuth } from "./authSlice";
import "./Auth.css";
import { Form, Button, Card, FloatingLabel } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  let [validate, setValidate] = useState(false);
  const auth = useSelector(selectAuth);
  let nav = useNavigate();
  let [signupState, setSignupState] = useState({
    email: "",
    password: "",
    name: "",
  });
  let submitHandler = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (!form.checkValidity()) {
      setValidate(true);
    } else {
      dispatch(signupUser(signupState, nav));
    }
  };
  let changeHandler = (e) =>
    setSignupState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  useEffect(() => {
    if (auth.value) nav("/dashboard");
  }, [auth.value]);
  return (
    <div className="auth-container">
      <Card className="m-3 auth-card">
        <Card.Body>
          <Card.Text as="h1" className="mb-3">
            REGISTER
          </Card.Text>
          <Form noValidate validated={validate} onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <FloatingLabel
                controlId="formBasicName"
                label="Enter name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={signupState.name}
                  onChange={changeHandler}
                  minLength={3}
                  maxLength={20}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Name must be 3-20 characters only
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="formBasicEmail"
                label="Enter email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={signupState.email}
                  onChange={changeHandler}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a valid email
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="formBasicPassword"
                label="Enter Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  required
                  minLength={5}
                  value={signupState.password}
                  onChange={changeHandler}
                />
                <Form.Control.Feedback type="invalid">
                  Password must be atleast 5 characters
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>

            <div className="mt-2">
              Already have an account?{" "}
              <Link to="/" className="text-center">
                Click here to Login
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
