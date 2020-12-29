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
import { ADD_BOOK } from "../Queries/book";
import { withRouter } from "react-router-dom";

function Createbook(props) {
  const [book, setBook] = useState({
    name: "",
    description: "",
    author:"",
    price:""
  });
  const [addBook] = useMutation(ADD_BOOK);

  const insertBook = async (e) => {
    e.preventDefault();
    let bookData = '';
    if (book.name !== '') {
        bookData = await addBook({
        variables: {
          name: book.name,
          description: book.description,
          author: book.author,
          price: book.price
        },
      });
    }
    
    if (bookData.data.createBook._id) {
        props.history.push("/Listbook");
      }
  };

  const onChange = (e) => {
    e.persist();
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <div className="app flex-row align-items-center" style={{width: "100%"}}>
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={insertBook}>
                  <h1>Add Book</h1>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={book.name}
                      onChange={onChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      placeholder="Description"
                      name="description"
                      id="description"
                      value={book.description}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      placeholder="Author"
                      name="author"
                      id="author"
                      value={book.author}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      placeholder="Price"
                      name="price"
                      id="price"
                      value={book.price}
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
export default withRouter(Createbook);
