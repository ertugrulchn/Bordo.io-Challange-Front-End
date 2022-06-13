import React from "react";
import { Container, Image } from "react-bootstrap";

function ErrorPage() {
  return (
    <Container>
      <Image
        src="https://cdn2.limonhost.net/wp-content/uploads/2020/10/404-not-found-sayfa-bulunamadi-hatasi-ve-cozumu.png"
        className="w-100"
      />
    </Container>
  );
}

export default ErrorPage;
