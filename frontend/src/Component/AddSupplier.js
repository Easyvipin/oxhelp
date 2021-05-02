import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useHistory } from "react-router-dom";
import { Form, InputGroup, Modal, Button, ListGroup } from "react-bootstrap";
import Loader from "./Loader";
const Supplier = () => {
  const [show, setShow] = React.useState(false);
  const { city } = useParams();
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /* error message */
  const [message, setMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [dispatch, setDispatch] = React.useState(false);

  const orgRef = React.useRef();
  const locRef = React.useRef();
  const nameRef = React.useRef();
  /* phone numbers ref */
  const oneRef = React.useRef();
  const twoRef = React.useRef();
  const threeRef = React.useRef();
  const fourRef = React.useRef();

  const notify = (customMessage, type) => {
    type === "success"
      ? toast.success(customMessage)
      : toast.error(customMessage);
  };
  /* handleSubmit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    setLoading(true);
    setDispatch(true);
    postData();
  };
  /* make a call */
  const postData = async () => {
    try {
      let senddata = JSON.stringify({
        org: orgRef.current.value,
        authorName: nameRef.current.value,
        helplines: [
          oneRef.current.value,
          twoRef.current.value,
          threeRef.current.value,
          fourRef.current.value,
        ],
        location: locRef.current.value,
        city: city,
      });

      let config = {
        method: "post",
        url: "/api/addsupplier",
        headers: {
          "Content-Type": "application/json",
        },
        data: senddata,
      };

      const { data } = await axios(config);
      if (data) {
        await notify(data.message, "success");
        setTimeout(() => history.push("/"), 1000);
      } else {
        notify("Error Try again", "error");
        setLoading(false);
      }
    } catch (err) {
      notify("Server Not Responding", "error");
      setTimeout(() => history.push("/"), 1000);
    }
    /*  const data =  */
  };

  return (
    <>
      {loading ? (
        <>
          <Loader message="Adding Supplier..." />
          <Toaster />
        </>
      ) : (
        <Form
          className="bg-info p-3 pb-5 pb text-light"
          onSubmit={(e) => {
            e.preventDefault();
            handleShow();
          }}
        >
          <h5 className="text-center text-light ">Basic information</h5>
          <Form.Group className="mt-4">
            <Form.Label className="font-weight-bold text-uppercase">
              Organization Name ~ संगठन
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="ex: sikh foundation"
              ref={orgRef}
              required
            />
            <Form.Text className="text-light">
              Name of the organization providing the help
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold text-uppercase">
              FULL NAME ~ पूरा नाम
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="ex: Pararmvir Singh"
              ref={nameRef}
              pattern="[a-zA-Z'-'\s]*"
              title="Name should be Alphabetic and in uppercase"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold text-uppercase">
              Location ~ स्थान
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              ref={locRef}
              placeholder="34-street lodhi Road,new delhi"
              required
            />
            <Form.Text className="text-muted">
              Name of the Person posting this
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold text-uppercase">
              Helpline Numbers ~ हेल्पलाइन नंबर
            </Form.Label>
            <InputGroup className="mt-2">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-light ">
                  &#x1F4DE;
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className="p-4"
                type="tel"
                placeholder="required"
                pattern="^\d{10}$"
                title="Number Should be of 10 digits"
                ref={oneRef}
                required
              />
            </InputGroup>
            <InputGroup className="mt-2">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-light ">
                  &#x1F4DE;
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className="p-4"
                type="tel"
                placeholder="required"
                pattern="^\d{10}$"
                title="Number Should be of 10 digits"
                ref={twoRef}
                required
              />
            </InputGroup>
            <InputGroup className="mt-2">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-light ">
                  &#x1F4DE;
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className="p-4"
                type="tel"
                placeholder="optional"
                pattern="^\d{10}$"
                ref={threeRef}
              />
            </InputGroup>
            <InputGroup className="mt-2">
              <InputGroup.Prepend>
                <InputGroup.Text className="bg-light">
                  &#x1F4DE;
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className="p-4"
                type="tel"
                placeholder="optional"
                pattern="^\d{10}$"
                ref={fourRef}
              />
            </InputGroup>
          </Form.Group>
          {message ? <span className="text-light">{message}</span> : message}
          <button type="submit" className="btn btn-block btn-primary">
            SUBMIT REQUEST
          </button>
          <Button
            onClick={() => history.goBack()}
            className="btn btn-primary btn-sm btn-block my-2"
          >
            Back To Search
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header className="bg-dark" closeButton>
              <Modal.Title className="text-light">
                Confirm Details ?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup>
                <ListGroup.Item>
                  <h6>ORG NAME :</h6>
                  {orgRef.current ? (
                    <span className="display-block">
                      {orgRef.current.value}
                    </span>
                  ) : null}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6>FULLNAME :</h6>
                  {nameRef.current ? (
                    <span className="display-block">
                      {nameRef.current.value}
                    </span>
                  ) : null}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6>LOCATION :</h6>
                  {locRef.current ? (
                    <span className="display-block">
                      {locRef.current.value}
                    </span>
                  ) : null}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6>Helplines :</h6>
                  {oneRef.current ? (
                    <span className="badge m-2 bg-info p-2 text-light">
                      {oneRef.current.value}
                    </span>
                  ) : null}
                  {twoRef.current ? (
                    <span className="badge m-2 bg-info p-2 text-light">
                      {twoRef.current.value}
                    </span>
                  ) : null}

                  {threeRef.current ? (
                    <span className="badge m-2 bg-info p-2 text-light">
                      {threeRef.current.value}
                    </span>
                  ) : null}
                  {fourRef.current ? (
                    <span className="badge m-2 bg-info p-2 text-light">
                      {fourRef.current.value}
                    </span>
                  ) : null}
                </ListGroup.Item>
              </ListGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={handleClose}>
                Change
              </Button>
              <button
                type="submit"
                className="btn btn-success"
                onClick={handleSubmit}
                variant="success"
              >
                Confirm
              </button>
            </Modal.Footer>
          </Modal>
        </Form>
      )}
    </>
  );
};

export default Supplier;
