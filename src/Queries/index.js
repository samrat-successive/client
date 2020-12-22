import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    books {
      id
      name
      description
      author
      price
    }
  }
`;

export const VIEW_USERS = gql`
  query($id: String!) {
    book(id: $id) {
      id
      name
      description
      author
      price
    }
  }
`;

export const ADD_USER = gql`
  mutation(
    $name: String!
    $description: String!
    $author: String!
    $price: String
  ) {
    createBook(
      input: {
        name: $name
        description: $description
        author: $author
        price: $price
      }
    ) {
      id
      name
      description
    }
  }
`;

export const EDIT_USER = gql`
  mutation(
    $id: String!
    $name: String!
    $description: String!
    $author: String!
    $price: String
  ) {
    updateBook(
      input: {
        id: $id
        name: $name
        description: $description
        author: $author
        price: $price
      }
    ) {
      id
      name
      description
      author
      price
    }
  }
`;

export const DELETE_USER = gql`
  mutation($id: String!) {
    deleteBook(id: $id) {
      id
    }
  }
`;
