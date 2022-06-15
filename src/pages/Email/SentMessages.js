import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import PaginationItem from "../../components/PaginationItem";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Email/`,
});

function SentMessages() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);

  useEffect(() => {
    api.get("/").then((res) => {
      setData(res.data);
    });
  }, []);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Recipient Email</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {currentItem.map((message) => (
            <tr>
              <td>{message.EmailId}</td>
              <td>{message.RecipientEmail}</td>
              <td>{message.Subject}</td>
              <td>{message.Message.substring(0, 50)}...</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationItem
        itemPerPage={itemPerPage}
        totalItems={data.length}
        paginate={paginate}
      />
    </Container>
  );
}

export default SentMessages;
