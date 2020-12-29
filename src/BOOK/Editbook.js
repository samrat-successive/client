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
import { VIEW_BOOK, EDIT_BOOK } from "../Queries/book";
import { withRouter, useLocation } from "react-router-dom";

function Editbook(props) {
    
    const location = useLocation();
    console.log('d', location);
    const [editBook] = useMutation(EDIT_BOOK);
    const { data: getMyBook } = useQuery(VIEW_BOOK, {
        variables: { id: location.state },
    });

    const [book, setbook] = useState({});
    

    useEffect(() => {
        if (getMyBook) {
            setbook(getMyBook.book);
        }
    }, [getMyBook]);

    const updateBook = async (e) => {
        e.preventDefault();
        try {
            let bookData = '';
            bookData = await editBook({
                variables: {
                    id: location.state,
                    name: book.name,
                    description: book.description,
                    author: book.author,
                    price: book.price,
                },
            });
            if (bookData.data.updateBook._id) {
                props.history.push("/Listbook");
            }
        } catch (error) {
            console.log('Error', error)
        }

    };

    const onChange = (e) => {
        e.persist();
        setbook({ ...book, [e.target.name]: e.target.value });
    };

    return (
        <div className="app flex-row align-items-center" style={{width: "100%"}}>
            <Container>
                <Row className="justify-content-center">
                    <Col md="12" lg="10" xl="8">
                        <Card className="mx-4">
                            <CardBody className="p-4">
                                <Form onSubmit={updateBook}>
                                    <h1>Update book</h1>

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

export default withRouter(Editbook);
