import React, { useState, useEffect } from "react";
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
import { useQuery, useMutation } from "@apollo/react-hooks";
import { VIEW_USERS, EDIT_USER } from "../Queries/user";

function Edituser(props) {
  const [editUser] = useMutation(EDIT_USER);

  const { data: getUserInfo } = useQuery(VIEW_USERS, {
    variables: { id: props.match.params.id },
  });

  const [user, setuser] = useState({});

  useEffect(() => {
    if (getUserInfo) {
      setuser(getUserInfo.user);
    }
  }, [getUserInfo]);

  const UpdateUser = (e) => {
    e.preventDefault();
    editUser({
      variables: {
        id: props.match.params.id,
        name: user.name,
        email: user.email,
      },
    });
    props.history.push("/Listuser");
  };

  const onChange = (e) => {
    e.persist();
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={UpdateUser}>
                  <h1>Update User</h1>

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

export default Edituser;
