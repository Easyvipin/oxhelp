import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import locationdata from "../state-city";
import { Link } from "react-router-dom";
const Need = ({ workType }) => {
  const sortdata = Object.entries(locationdata);
  const [state, setState] = React.useState(0);
  const [city, setCity] = React.useState();
  const [disState, setDisState] = React.useState(false);

  const handleChange = (e) => {
    setDisState(true);
    setState(e.target.value);
    const defaultCity = sortdata[e.target.value][1];
    setCity(defaultCity[0]);
  };

  const toggleCity = (e) => {
    setCity(e.target.value);
  };

  return (
    <Container className="mt-4 need-form">
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          {/* state */}
          <Form.Control as="select" size="3" onChange={handleChange}>
            {sortdata.map((item, index) => {
              return (
                <option key={index} value={index}>
                  {item[0]}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <br />
        {/* cities , disabled by default */}
        {disState ? (
          <>
            <Form.Group>
              <Form.Control onChange={toggleCity} as="select">
                {sortdata[state][1].map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            {workType === "search" ? (
              <Link
                className="btn btn-block btn-success"
                id="search-submit"
                disabled={!disState}
                type="button"
                to={`/supply/${city}`}
              >
                SEARCH
              </Link>
            ) : (
              <Link
                className="btn btn-block btn-success"
                id="search-submit"
                disabled={!disState}
                type="button"
                to={`/supplyform/${city}`}
              >
                PROCEED
              </Link>
            )}
          </>
        ) : (
          <h6 className="text-center mt-2">Choose Your State First</h6>
        )}
      </Form>
    </Container>
  );
};

export default Need;
