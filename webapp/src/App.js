import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, ListGroup } from "react-bootstrap";
import axios from "axios";

import "./App.css";

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:8000";

function App() {
  console.log(SERVER_ENDPOINT);
  const [name, setName] = useState("");

  const [nameList, setNameList] = useState(["loading..."]);

  const getNameList = () => {
    axios
      .get(`${SERVER_ENDPOINT}/name`)
      .then(({ data }) => {
        setNameList(data.nameList);
      })
      .catch((error) => console.log(error));
  };

  const submitName = (e) => {
    e.preventDefault();

    axios
      .post(`${SERVER_ENDPOINT}/name`, { data: { name } })
      .then((res) => {
        if (res.status === 200) {
          setName("");
          getNameList();
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(getNameList, []);

  return (
    <div className="container">
      <div className="form">
        <Form>
          <Form.Group controlId="forBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your name with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={submitName}>
            Add
          </Button>
        </Form>
      </div>

      <div className="list-container">
        <ListGroup>
          {nameList.map((name, index) => (
            <ListGroup.Item key={index}>{name}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default App;
