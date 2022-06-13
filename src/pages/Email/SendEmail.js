import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Email/SendEmail`,
});

function SendEmail() {
  const [data, setData] = useState({
    RecipientEmail: "",
    Subject: "",
    Message: "",
  });
  const navigate = useNavigate();
  const SendEmail = (e) => {
    e.preventDefault();
    const data1 = {
      RecipientEmail: data.RecipientEmail,
      Subject: data.Subject,
      Message: data.Message,
    };
    api.post("/", data1).then((result) => {
      console.log(result.data);
      if (result.data.status == 200) {
        var alert = document.getElementById("errorAlert");
        alert.classList.remove("invisible");
        alert.innerText = result.data.message;
      } else {
        console.log("Error");
      }
    });
  };

  const onChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <Alert
        key="success"
        variant="success"
        className="invisible"
        id="errorAlert"
      ></Alert>
      <Form
        className="bg-light p-5"
        style={{ borderRadius: 20 }}
        onSubmit={SendEmail}
      >
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="email"
              placeholder="Recipient Email"
              onChange={onChange}
              id="RecipientEmail"
              name="RecipientEmail"
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Subject"
              onChange={onChange}
              id="Subject"
              name="Subject"
            />
          </Col>
        </Row>
        <textarea
          className="form-control"
          placeholder="Message"
          onChange={onChange}
          id="Message"
          name="Message"
          rows={6}
        ></textarea>
        <div className="d-grid gap-2">
          <Button
            className="mt-3 "
            variant="outline-primary"
            type="submit"
            size="lg"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default SendEmail;
