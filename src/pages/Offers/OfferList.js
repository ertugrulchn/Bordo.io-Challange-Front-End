import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Offer`,
});

function OfferList() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    api.get("/").then((res) => {
      setOffers(res.data);
    });
  }, []);

  const deleteOffer = (id) => {
    api.delete(`/${id}`);
    window.location.reload();
  };

  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Offer Name</th>
            <th>Offer Description</th>
            <th>Process</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.offerId}>
              <td>{offer.OfferId}</td>
              <td>{offer.OfferName}</td>
              <td>{offer.OfferDescription.substring(0, 50)}...</td>
              <td>
                <a
                  className="btn btn-success"
                  href={`update-offer/${offer.OfferId}`}
                >
                  <AiFillEdit />
                </a>
                <Button
                  variant="danger"
                  onClick={() => deleteOffer(offer.OfferId)}
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

export default OfferList;
