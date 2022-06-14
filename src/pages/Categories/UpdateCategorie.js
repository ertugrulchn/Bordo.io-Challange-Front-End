import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Alert, Button, Container, Form } from "react-bootstrap";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Categorie`,
});

function UpdateCategorie(props) {
  const { id } = useParams();
  const [categories, setCategories] = useState({
    CategorieName: "",
    CategorieDescription: "",
  });

  useEffect(() => {
    api.get(`/${id}`).then((res) => {
      setCategories(res.data);
    });
  });

  const UpdateCategorie = (e) => {
    e.preventDefault();
    const data = {
      CategorieId: categories.CategorieId,
      CategorieName: categories.CategorieName,
      CategorieDescription: categories.CategorieDescription,
    };
    console.log(data);
    // api.put(`/`, data).then((result) => {
    //   if (result.data.status == 200) {
    //     var alert = document.getElementById("successAlert");
    //     alert.classList.remove("invisible");
    //     alert.innerText = result.data.message;
    //   }
    // });
  };

  const onChange = (e) => {
    e.persist();
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
        onSubmit={UpdateCategorie}
      >
        <Form.Control
          type="text"
          value={categories.CategorieId}
          name="CategorieId"
          hidden={true}
          required
        />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Categorie Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Cateogrie Name"
            value={categories.CategorieName}
            onChange={onChange}
            name="CategorieName"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cateogire Description</Form.Label>
          <textarea
            className="form-control"
            placeholder="Enter Categorie Description"
            rows={5}
            defaultValue={categories.CategorieDescription}
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

export default UpdateCategorie;
