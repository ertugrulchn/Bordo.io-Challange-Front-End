import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Subscriber/AddCsvFile`,
});

function AddSubscribersTable() {
  const [file, setFile] = useState("");

  const AddSubscribersTable = (e) => {
    const formData = new FormData();
    formData.append('files', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    api.post("/", formData, config).then((result) => {
      if (result.data.status == 200) {
        var alert = document.getElementById("successAlert");
        alert.classList.remove("invisible");
        alert.innerText = result.data.message;
      }
    });
  };

  return (
    <Container className="mt-5">
      <Alert
        key="success"
        variant="success"
        className="invisible"
        id="successAlert"
      ></Alert>
      <Form
        className="bg-light p-5"
        style={{ borderRadius: 20 }}
        onSubmit={AddSubscribersTable}
        encType="multipart/form-data"
      >
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="file"
            placeholder="Enter Fisrt Name"
            onChange={(e) => setFile(e.target.files[0])}
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

export default AddSubscribersTable;
