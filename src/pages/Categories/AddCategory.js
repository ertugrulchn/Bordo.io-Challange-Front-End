import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Category/`,
});

function AddCategory() {
  const [categories, setCategories] = useState({
    CategoryName: "",
    CategoryDescription: "",
  });
  useEffect(() => {
    api.get("/").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const AddCategory = (e) => {
    e.preventDefault();
    const data = {
      CategoryName: categories.CategoryName,
      CategoryDescription: categories.CategoryDescription,
    };
    api.post("/", data).then((result) => {
      if (result.data.status == 200) {
        var alert = document.getElementById("successAlert");
        alert.classList.remove("invisible");
        alert.innerText = result.data.message;
      }
    });
  };

  const onChange = (e) => {
    setCategories({ ...categories, [e.target.name]: e.target.value });
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
        onSubmit={AddCategory}
      >
        <Form.Group className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Cateogry Name"
            value={categories.CateogryName}
            onChange={onChange}
            name="CategoryName"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cateogiry Description</Form.Label>
          <textarea
            className="form-control"
            placeholder="Enter Category Description"
            rows={5}
            value={categories.CategoryDescription}
            onChange={onChange}
            name="CategoryDescription"
            required
          ></textarea>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddCategory;
