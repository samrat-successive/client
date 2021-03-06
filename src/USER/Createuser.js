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
  Alert
} from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../Queries/user";

function Createuser(props) {
  const [user, setUser] = useState({
    name: "",
    description: "",
    author: "",
    price: "",
  });

  const [visible, setVisible] = useState({
    status: false,
    message: ''
  });

  const onDismiss = () => setVisible(false);

  const [addUser] = useMutation(ADD_USER);

  const InserUser = async (e) => {
    e.preventDefault();
    try {
      let userData = '';
      if (user.name !== "") {
        userData = await addUser({
          variables: {
            name: user.name,
            email: user.email,
            password: user.password,
          },
        });
      }
      if (userData.data.createUser.token) {
        props.history.push("/Signin");
      }
    } catch (error) {
      setVisible({
        status: true, message: "User already exists."
      });
      setTimeout(() => {
        setVisible({
          status: false
        })
      }, 5000);
    }

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
                  <h1>User Registration</h1>
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
                  <Alert color="danger" isOpen={visible.status} toggle={onDismiss}>
                    {visible.message}
                  </Alert>
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
