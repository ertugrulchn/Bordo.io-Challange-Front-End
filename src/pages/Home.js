import React from "react";
import { Container } from "react-bootstrap";

function Home() {
  const style = {
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-wrap": "wrap",
    height: "100vh",
  };

  return (
    <Container style={style}>
      <h1>Ertuğrul Emre Cihan Bordo.IO Challange</h1>
    </Container>
  );
}

export default Home;
