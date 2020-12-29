import { gql } from "apollo-boost";

export const GET_BOOKS = gql`
  {
    books {
      _id
      name
      description
      author
      price
    }
  }
`;

export const VIEW_BOOK = gql`
  query($id: String!) {
    book(id: $id) {
      _id
      name
      description
      author
      price
    }
  }
`;

export const ADD_BOOK = gql`
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
      _id
      name
      description
    }
  }
`;

export const EDIT_BOOK = gql`
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
      _id
      name
      description
      author
      price
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation($id: String!) {
    deleteBook(id: $id) {
      _id
    }
  }
`;
