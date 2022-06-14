import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Modal, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Categorie/`,
});

function AddCategorie() {
  const [categories, setCategories] = useState({
    CategorieName: "",
    CategorieDescription: "",
  });
  useEffect(() => {
    api.get("/").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const AddCategorie = (e) => {
    e.preventDefault();
    const data = {
      CategorieName: categories.CategorieName,
      CategorieDescription: categories.CategorieDescription,
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
    e.persist();
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
        onSubmit={AddCategorie}
      >
        <Form.Group className="mb-3">
          <Form.Label>Categorie Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Cateogrie Name"
            value={categories.name}
            onChange={onChange}
            name="CategorieName"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cateogire Description</Form.Label>
          <textarea
            className="form-control"
            placeholder="Enter Categorie Description"
            rows={5}
            value={categories.description}
            onChange={onChange}
            name="CategorieDescription"
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

export default AddCategorie;
