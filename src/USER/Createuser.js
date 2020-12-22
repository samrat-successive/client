import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
} from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../Queries";

function Createuser(props) {
  const [user, setUser] = useState({
    name: "",
    description: "",
    author: "",
    price: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const InserUser = (e) => {
    e.preventDefault();
    if (user.name !== "") {
      addUser({
        variables: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });
    }
    props.history.push("/EmployeList");
  };

  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={InserUser}>
                  <h1>Add Book</h1>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={user.name}
                      onChange={onChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      placeholder="Email"
                      name="email"
                      id="email"
                      value={user.email}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      id="password"
                      value={user.password}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="12" sm="6">
                        <Button
                          type="submit"
                          className="btn btn-info mb-1"
                          block
                        >
                          <span>Save</span>
                        </Button>
                      </Col>
                      <Col xs="12" sm="6">
                        <Button className="btn btn-info mb-1" block>
                          <span>Cancel</span>
                        </Button>
                      </Col>
                    </Row>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Createuser;
