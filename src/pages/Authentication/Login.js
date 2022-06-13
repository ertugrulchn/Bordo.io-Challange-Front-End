import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Authentication/Login`,
});

function Login(props) {
  const [user, setUser] = useState({ Email: "", Password: "" });
  const navigate = useNavigate();
  const Login = (e) => {
    e.preventDefault();
    const data = { Email: user.Email, Password: user.Password };
    api.post("/", data).then((result) => {
      if (result.data.status == 200) {
        const serializedState = JSON.stringify(result.data.UserDetails);
        var userCookie = localStorage.setItem("userData", serializedState);
        console.log("Cookie: ", userCookie);
        const user = result.data.UserDetails;
        console.log(result.data.message);
        navigate("/offer");
        window.location.reload();
      } else {
        var alert = document.getElementById("errorAlert");
        alert.classList.remove("invisible");
        alert.innerText = "Login Failed: Invalid Email or Password.";
      }
    });
  };

  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Form onSubmit={Login} className="mt-5">
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.Email}
            onChange={onChange}
            id="Email"
            name="Email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.Password}
            onChange={onChange}
            id="Password"
            name="Password"
          />
        </Form.Group>
        <Alert key="danger" variant="danger" className="invisible" id="errorAlert"></Alert>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
