import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($text: String!, $repositoryName: String!, $rating: Int!, $ownerName: String! ) {
    createReview(review: {text: $text, repositoryName: $repositoryName, rating: $rating, ownerName: $ownerName}) {
      user {
        username
      }
      repositoryId
      repository {
        reviewCount
      }
      id
      createdAt
    }
  }
`;