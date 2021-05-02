import React from "react";
import { Container, Button, Image } from "react-bootstrap";
import Need from "./Need";
import AddSupplier from "./AddSupplier";
import tank from "../Images/tank.png";
const Home = () => {
  const [needView, setNeedView] = React.useState(false);
  const [supplyView, setSupplyView] = React.useState(false);
  return (
    <>
      {needView ? <Need workType="search" /> : " "}
      {supplyView ? <Need workType="submit" /> : " "}

      {needView || supplyView ? (
        " "
      ) : (
        <Container className="p-4 text-center">
          <blockquote class="blockquote">
            <h5 class="mb-0 ">
              " हम मानवता के लिए निराशा नहीं कर सकते, क्योंकि हम खुद एक इंसान
              हैं "
              <p class="blockquote-footer mt-2">
                Albert Einstein<cite title="Source Title"></cite>
              </p>
            </h5>
          </blockquote>
          <Image src={tank} width="100px" fluid></Image>
          <h1 className="text-center mt-4">OXHELP</h1>

          <p className="font-weight-bold mt-2">
            ऑक्सीजन आपूर्तिकर्ता यहाँ प्राप्त करें
          </p>
          <Button
            className="btn btn-primary btn-block"
            onClick={() => setNeedView(true)}
          >
            <i className="fas fa-hands mx-1"></i> Need Supplier
          </Button>
          <p className="font-weight-bold m-3">
            प्रदायक? सूची में खुद को जोड़ें
          </p>
          <Button
            className="btn btn-primary my-2 btn-block"
            onClick={() => setSupplyView(true)}
          >
            <i className="fas fa-hand-holding-medical mx-1"></i> Add Supplier
          </Button>
        </Container>
      )}
    </>
  );
};

export default Home;
