import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS, DELETE_USER } from "../Queries/user";

function Listuser(props) {
  const { data: getAllUsers, loading, refetch } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }]
  });

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
      pathname: "/edituser/" + id,
    });
  };
  if (loading) return "loading";
  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> User's List
            </CardHeader>
            <CardBody>
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllUsers
                    ? getAllUsers.users.map((item, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
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

export default Listuser;
