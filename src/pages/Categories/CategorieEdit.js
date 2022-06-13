import axios from "axios";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Categorie`,
});

const CategorieEdit = () => {
  const params = useParams();

  React.useEffect(() => {
    console.log(params);
  }, [params]);

  return (
    <Container>
      <Form className="bg-light p-5" style={{ borderRadius: 20 }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Categorie Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Cateogrie Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cateogire Description</Form.Label>
          <textarea
            className="form-control"
            placeholder="Enter Categorie Description"
            rows={5}
          ></textarea>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CategorieEdit;
