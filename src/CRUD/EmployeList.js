import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS, DELETE_USER } from "../Queries";

function EmployeList(props) {
  const { data: getAllUsers, loading, refetch } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }]
  });

  useEffect(() => {
    refetch();
  }, []);

  const deleteeployee = (id) => {
    deleteUser({
      variables: {
        id: id,
      },
    });
    refetch();
  };
  const editemployee = (id) => {
    props.history.push({
      pathname: "/edit/" + id,
    });
  };
  if (loading) return "loading";
  return (
    <div className="animated fadeIn">
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
                  {getAllUsers
                    ? getAllUsers.books.map((item, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.author}</td>
                            <td>{item.price}</td>
                            <td>
                              <div className="btn-group">
                                <button
                                  className="btn btn-warning"
                                  onClick={() => {
                                    editemployee(item.id);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-warning"
                                  onClick={() => {
                                    deleteeployee(item.id);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : []}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EmployeList;
