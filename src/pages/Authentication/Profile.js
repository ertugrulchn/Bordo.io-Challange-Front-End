import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

function Profile() {
  const [user, setUser] = useState({ Email: "", Password: "" });
  useEffect(() => {
    var localData = localStorage.getItem("userData");
    var parsedData = JSON.parse(localData);
    setUser(parsedData);
  }, []);

  return (
    <Container className="mt-5">
      <Row className="p-5 bg-light" style={{ borderRadius: 20 }}>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>My User Name</Form.Label>
            <Form.Control value={user.UserName} disabled />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>My Email Address</Form.Label>
            <Form.Control value={user.Email} disabled />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
