import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import PaginationItem from "../../components/PaginationItem";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Category`,
});

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);

  useEffect(() => {
    api.get("/").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const deleteCategory = (id) => {
    api.delete(`/${id}`);
    window.location.reload();
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = categories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Categorie Name</th>
            <th>Categorie Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Process</th>
          </tr>
        </thead>
        <tbody>
          {currentItem.map((category) => (
            <tr key={category.CategoryId}>
              <td>{category.CategoryId}</td>
              <td>{category.CategoryName}</td>
              <td>{category.CategoryDescription.substring(0, 50)}...</td>
              <td>{category.CreatedAt}</td>
              <td>{category.UpdatedAt}</td>
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
      <PaginationItem
        itemPerPage={itemPerPage}
        totalItems={categories.length}
        paginate={paginate}
      />
    </Container>
  );
}

export default CategoryList;
