import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Subscriber`,
});

function SubscriberList() {
  const [subscribers, setSubscriber] = useState([]);

  useEffect(() => {
    api.get("/").then((res) => {
      setSubscriber(res.data);
    });
  }, []);

  const deleteSubscriber = (id) => {
    api.delete(`/${id}`);
    window.location.reload();
  };

  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Description</th>
            <th>Mail</th>
            <th>Process</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr key={subscriber.SubscriberId}>
              <td>{subscriber.SubscriberId}</td>
              <td>{subscriber.FirstName}</td>
              <td>{subscriber.LastName}</td>
              <td>{subscriber.Mail}</td>
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
    </Container>
  );
}

export default SubscriberList;
