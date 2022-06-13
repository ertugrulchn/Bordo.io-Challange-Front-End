import axios from "axios";
import React, { Component, useState } from "react";
import { Button, Card, Container, Form, Row, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Categorie`,
});

class CategorieList extends Component {
  state = {
    categories: [],
  };

  //Categorie Name Value
  handleCategorieNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  //Categorie Description Value
  handleCategorieDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  constructor() {
    super();
    api.get("/").then((res) => {
      this.setState({ categories: res.data });
    });
  }

  //Create a New Categorie
  createCategorie = async () => {
    let res = await api.post("/", {
      CategorieName: this.state.name,
      CategorieDescription: this.state.description,
    });
  };

  deleteCategorie = async (id) => {
    let data = api.delete(`/${id}`);
  };

  // TODO:Update Rewrite
  // updateCategorie = async (id, categorieName, categorieDescription) => {
  //   let data = await api.patch(`/${id}`, {
  //     CategorieName: categorieName,
  //     CategorieDescription: categorieDescription,
  //   });
  // };

  writeData = (id, categorieName, categorieDescription) => {
    this.state.name = categorieName;
    this.state.description = categorieDescription;
    console.log(this.state.name, this.state.description);
  };

  render() {
    return (
      <>
        <Container className="mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Categorie Name</th>
                <th>Categorie Description</th>
                <th>Process</th>
              </tr>
            </thead>
            <tbody>
              {this.state.categories.map((categorie) => (
                <tr key={categorie.CategorieId}>
                  <td>{categorie.CategorieId}</td>
                  <td>{categorie.CategorieName}</td>
                  <td>{categorie.CategorieDescription}</td>
                  <td>
                    <a
                      href={`/categorie/edit/${categorie.Id}`}
                      className="btn btn-success"
                    >
                      <AiFillEdit />
                    </a>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        this.deleteCategorie(categorie.CategorieId)
                      }
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Form
            className="bg-light p-5"
            style={{ borderRadius: 20 }}
            onSubmit={this.handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Categorie Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Cateogrie Name"
                value={this.state.name}
                onChange={this.handleCategorieNameChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Cateogire Description</Form.Label>
              <textarea
                className="form-control"
                placeholder="Enter Categorie Description"
                rows={5}
                value={this.state.description}
                onChange={this.handleCategorieDescriptionChange}
              ></textarea>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={this.createCategorie}
            >
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default CategorieList;
