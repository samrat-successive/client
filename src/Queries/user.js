import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    users {
      id
      name
      email
    }
  }
`;

export const VIEW_USERS = gql`
  query($id: String!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

export const ADD_USER = gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      input: {
        name: $name
        email: $email
        password: $password
      }
    ) {
      token
    }
  }
`;

export const EDIT_USER = gql`
  mutation(
    $id: String!
    $name: String!
    $email: String!
  ) {
    updateUser(
      input: {
        id: $id
        name: $name
        email: $email
      }
    ) {
      id
      name
      email
    }
  }
`;

export const SIGNIN_USER = gql`
mutation(
  $email: String!
  $password: String!
) {
  signInUser(
    input: {
      email: $email
      password: $password
    }
  ) {
    token
  }
}
`;

export const DELETE_USER = gql`
  mutation($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const MY_PROFILE = gql`
  query {
    me {
      _id,
      name,
      email
    }
  }
`;
