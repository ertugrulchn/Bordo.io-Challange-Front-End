import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Alert, Button, Container, Form } from "react-bootstrap";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Subscriber`,
});

function UpdateSubscriber() {
  const { id } = useParams({});
  const [subscribers, setSubscriber] = useState({
    FirstName: "",
    LastName: "",
    Mail: "",
  });

  useEffect(() => {
    api.get(`/${id}`).then((res) => {
      setSubscriber(res.data);
    });
  }, []);

  const UpdateSubscriber = (e) => {
    e.preventDefault();
    const data = {
      SubscriberId: subscribers.SubscriberId,
      FirstName: subscribers.FirstName,
      LastName: subscribers.LastName,
      Mail: subscribers.Mail,
    };
    console.log(data);
    api.put(`/`, data).then((result) => {
      if (result.data.status == 200) {
        var alert = document.getElementById("successAlert");
        alert.classList.remove("invisible");
        alert.innerText = result.data.message;
      }
    });
  };

  const onChange = (e) => {
    setSubscriber({ ...subscribers, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Alert
        key="success"
        variant="success"
        className="invisible"
        id="successAlert"
      ></Alert>
      <Form
        className="bg-light p-5"
        style={{ borderRadius: 20 }}
        onSubmit={UpdateSubscriber}
      >
        <Form.Control
          type="text"
          value={subscribers.SubscriberId}
          name="CategoryId"
          hidden={true}
          required
        />
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Fisrt Name"
            value={subscribers.FirstName}
            onChange={onChange}
            name="FirstName"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={subscribers.LastName}
            onChange={onChange}
            name="LastName"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email Address"
            value={subscribers.Mail}
            onChange={onChange}
            name="Mail"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateSubscriber;
