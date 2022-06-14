import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Alert, Button, Container, Form } from "react-bootstrap";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Offer`,
});

function UpdateOffer() {
  const { id } = useParams({});
  const [offers, setOffers] = useState({
    OfferName: "",
    OfferDescription: "",
  });

  useEffect(() => {
    api.get(`/${id}`).then((res) => {
      setOffers(res.data);
    });
  }, []);

  const UpdateOffer = (e) => {
    e.preventDefault();
    const data = {
      OfferId: offers.OfferId,
      OfferName: offers.OfferName,
      OfferDescription: offers.OfferDescription,
    };
    console.log(data);
    api.put(`/`, data).then((result) => {
      if (result.data.status == 200) {
        var alert = document.getElementById("successAlert");
        alert.classList.remove("invisible");
        alert.innerText = result.data.message;
      }
    });
  };

  const onChange = (e) => {
    const newState = { ...offers };
    setOffers({ ...offers, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Alert
        key="success"
        variant="success"
        className="invisible"
        id="successAlert"
      ></Alert>
      <Form
        className="bg-light p-5"
        style={{ borderRadius: 20 }}
        onSubmit={UpdateOffer}
      >
        <Form.Control
          type="text"
          value={offers.OfferId}
          name="CategoryId"
          hidden={true}
          required
        />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Offer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Offer Name"
            value={offers.OfferName}
            onChange={onChange}
            name="OfferName"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Offer Description</Form.Label>
          <textarea
            className="form-control"
            placeholder="Enter Offer Description"
            rows={5}
            value={offers.OfferDescription}
            onChange={onChange}
            name="OfferDescription"
            required
          ></textarea>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateOffer;
