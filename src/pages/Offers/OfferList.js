import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import PaginationItem from "../../components/PaginationItem";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Offer`,
});

function OfferList() {
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);

  useEffect(() => {
    api.get("/").then((res) => {
      setOffers(res.data);
    });
  }, []);

  const deleteOffer = (id) => {
    api.delete(`/${id}`);
    window.location.reload();
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = offers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Offer Name</th>
            <th>Offer Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Process</th>
          </tr>
        </thead>
        <tbody>
          {currentItem.map((offer) => (
            <tr key={offer.offerId}>
              <td>{offer.OfferId}</td>
              <td>{offer.OfferName}</td>
              <td>{offer.OfferDescription.substring(0, 50)}...</td>
              <td>{offer.CreatedAt}</td>
              <td>{offer.UpdatedAt}</td>
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
      <PaginationItem
        itemPerPage={itemPerPage}
        totalItems={offers.length}
        paginate={paginate}
      />
    </Container>
  );
}

export default OfferList;
