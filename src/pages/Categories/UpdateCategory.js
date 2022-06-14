import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Alert, Button, Container, Form } from "react-bootstrap";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Category`,
});

function UpdateCategory(props) {
  const { id } = useParams({});
  const [categories, setCategories] = useState({
    CategoryName: "",
    CategoryDescription: "",
  });

  useEffect(() => {
    api.get(`/${id}`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  const UpdateCategory = (e) => {
    e.preventDefault();
    const data = {
      CategoryId: categories.CategoryId,
      CategoryName: categories.CategoryName,
      CategoryDescription: categories.CategoryDescription,
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
    const newState = { ...categories };
    setCategories({ ...categories, [e.target.name]: e.target.value });
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
        onSubmit={UpdateCategory}
      >
        <Form.Control
          type="text"
          value={categories.CategoryId}
          name="CategoryId"
          hidden={true}
          required
        />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Cateogry Name"
            value={categories.CategoryName}
            onChange={onChange}
            name="CategoryName"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
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

export default UpdateCategory;
