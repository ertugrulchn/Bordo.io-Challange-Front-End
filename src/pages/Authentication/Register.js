import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Authentication/Register`,
});

function Register(props) {
  const [data, setData] = useState({ Name: "", Email: "", Password: "" });
  const navigate = useNavigate();
  const Registration = (e) => {
    e.preventDefault();
    const data1 = {
      Name: data.Name,
      Email: data.Email,
      Password: data.Password,
    };
    api.post("/", data1).then((result) => {
      console.log(result.data);
      if (result.data.status == 200) {
        navigate("/login");
        window.location.reload();
      } else {
      }
    });
  };

  const onChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <Form onSubmit={Registration} className="mt-5">
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={data.Name}
            onChange={onChange}
            name="Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={data.Email}
            onChange={onChange}
            name="Email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={data.Password}
            onChange={onChange}
            name="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
