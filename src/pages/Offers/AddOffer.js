import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form} from "react-bootstrap";

const api = axios.create({
  baseURL: `http://localhost:62287/api/Offer`,
});

function AddOffer() {
  const [offers, setOffers] = useState({
    OfferName: "",
    OfferDescription: "",
  });

  useEffect(() => {
    api.get("/").then((res) => {
      setOffers(res.data);
    });
  }, []);

  const AddOffer = (e) => {
    e.preventDefault();
    const data = {
      OfferName: offers.OfferName,
      OfferDescription: offers.OfferDescription,
    };
    api.post("/", data).then((result) => {
      if (result.data.status == 200) {
        var alert = document.getElementById("successAlert");
        alert.classList.remove("invisible");
        alert.innerText = result.data.message;
      }
    });
  };

  const onChange = (e) => {
    setOffers({ ...offers, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-5">
      <Alert
        key="success"
        variant="success"
        className="invisible"
        id="successAlert"
      ></Alert>
      <Form
        className="bg-light p-5"
        style={{ borderRadius: 20 }}
        onSubmit={AddOffer}
      >
        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
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

export default AddOffer;
