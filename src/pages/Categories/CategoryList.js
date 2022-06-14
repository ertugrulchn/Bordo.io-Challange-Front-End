import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Category`,
});

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const deleteCategory = (id) => {
    api.delete(`/${id}`);
    window.location.reload();
  };

  return (
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
          {categories.map((category) => (
            <tr key={category.CategoryId}>
              <td>{category.CategoryId}</td>
              <td>{category.CategoryName}</td>
              <td>{category.CategoryDescription.substring(0, 50)}...</td>
              <td>
                <a
                  className="btn btn-success"
                  href={`update-category/${category.CategoryId}`}
                >
                  <AiFillEdit />
                </a>
                <Button
                  variant="danger"
                  onClick={() => deleteCategory(category.CategoryId)}
                >
                  <RiDeleteBinLine />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default CategoryList;
