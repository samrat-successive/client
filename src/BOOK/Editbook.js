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
    const [editBook] = useMutation(EDIT_BOOK);
    const { data: getMyBook } = useQuery(VIEW_BOOK, {
        variables: { id: location.state },
    });

    const [book, setbook] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (getMyBook) {
            setbook(getMyBook.book);
        }
    }, [getMyBook]);

    const updateBook = async (e) => {
        e.preventDefault();
        let validForm = await validateForm(book);
        try {
            let bookData = '';
            if (Object.keys(validForm).length === 0) {
                bookData = await editBook({
                    variables: {
                        id: location.state,
                        name: book.name,
                        description: book.description,
                        author: book.author,
                        price: book.price,
                    },
                });
                if (bookData.data && bookData.data.updateBook._id) {
                    props.history.push("/Listbook");
                }
            }
        } catch (errors) {
            props.showError(errors.message);
        }

    };

    const validateForm = async (book) => {
        let errors = {};
        let { name, description, author, price } = book;
        if (name === '') {
            errors.name = 'Name field is required';
        }
        if (description === '') {
            errors.description = 'Description field is required';
        }
        if (author === '') {
            errors.author = 'Author field is required';
        }
        if (price === '') {
            errors.price = 'Price field is required';
        }
        await setErrors(errors);
        return errors;
    };

    const onChange = (e) => {
        e.persist();
        setbook({ ...book, [e.target.name]: e.target.value });
    };

    const redirectToList = () => {
        props.history.push('/Listbook');
    }

    return (
        <div className="app flex-row align-items-center" style={{ width: "100%" }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md="12" lg="10" xl="8">
                        <Card className="mx-4">
                            <CardBody className="p-4">
                                <Form onSubmit={updateBook}>
                                    <h1>Update book</h1>
                                    <div className="form-group text-left">
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
                                        {errors.name && <label className="validation-errors">{errors.name}</label>}
                                    </div>
                                    <div className="form-group text-left">
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
                                        {errors.name && <label className="validation-errors">{errors.name}</label>}
                                    </div>
                                    <div className="form-group text-left">
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
                                        {errors.author && <label className="validation-errors">{errors.author}</label>}
                                    </div>
                                    <div className="form-group text-left">
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
                                        {errors.price && <label className="validation-errors">{errors.price}</label>}
                                    </div>
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
                                                <Button className="btn btn-info mb-1" block
                                                    onClick={() => redirectToList()}
                                                >
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
