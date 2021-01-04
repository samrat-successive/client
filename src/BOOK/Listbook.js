import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_BOOKS, DELETE_BOOK } from "../Queries/book";
import { withRouter } from "react-router-dom";

function Listbook(props) {
    const { data: getAllBooks, loading, refetch } = useQuery(GET_BOOKS);
    const [deleteBook] = useMutation(DELETE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }]
    });

    useEffect(() => {
        refetch();
    }, []);

    const deleteBookById = (id) => {
        try {
            deleteBook({
                variables: {
                    id: id,
                },
            });
            refetch();
        } catch (error) {
            console.log('Some went wrong');
        }
    };
    const editBook = (_id) => {
        props.history.push({
            pathname: "/Editbook",
            state: _id
        });
    };
    if (loading) return "loading";
    return (
        <div className="animated fadeIn" style={{ width: "100%" }}>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Bokks List
            </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Author</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getAllBooks
                                        ? getAllBooks.books.map((item, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{item._id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.author}</td>
                                                    <td>{item.price}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button
                                                                className="btn btn-warning"
                                                                onClick={() => {
                                                                    editBook(item._id);
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-warning"
                                                                onClick={() => {
                                                                    deleteBookById(item._id);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        : "No records found."}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default withRouter(Listbook);
