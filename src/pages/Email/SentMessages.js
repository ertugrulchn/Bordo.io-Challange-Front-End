import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Email/`,
});

function SentMessages() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get("/").then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Container>
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
          {data.map((message) => (
            <tr>
              <td>{message.EmailId}</td>
              <td>{message.RecipientEmail}</td>
              <td>{message.Subject}</td>
              <td>{message.Message.substring(0, 80)}...</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SentMessages;
