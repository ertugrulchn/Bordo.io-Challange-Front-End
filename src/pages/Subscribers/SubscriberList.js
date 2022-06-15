import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import PaginationItem from "../../components/PaginationItem";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Subscriber`,
});

function SubscriberList() {
  const [subscribers, setSubscriber] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);

  useEffect(() => {
    api.get("/").then((res) => {
      setSubscriber(res.data);
    });
  }, []);

  const deleteSubscriber = (id) => {
    api.delete(`/${id}`);
    window.location.reload();
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = subscribers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Description</th>
            <th>Mail</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Process</th>
          </tr>
        </thead>
        <tbody>
          {currentItem.map((subscriber) => (
            <tr key={subscriber.SubscriberId}>
              <td>{subscriber.SubscriberId}</td>
              <td>{subscriber.FirstName}</td>
              <td>{subscriber.LastName}</td>
              <td>{subscriber.Mail}</td>
              <td>{subscriber.CreatedAt}</td>
              <td>{subscriber.UpdatedAt}</td>
              <td>
                <a
                  className="btn btn-success"
                  href={`update-subscriber/${subscriber.SubscriberId}`}
                >
                  <AiFillEdit />
                </a>
                <Button
                  variant="danger"
                  onClick={() => deleteSubscriber(subscriber.SubscriberId)}
                >
                  <RiDeleteBinLine />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationItem itemPerPage={itemPerPage} totalItems={subscribers.length} paginate={paginate} />
    </Container>
  );
}

export default SubscriberList;
