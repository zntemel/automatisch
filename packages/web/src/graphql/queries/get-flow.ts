import { gql } from '@apollo/client';

export const GET_FLOW = gql`
  query GetFlow($id: String!) {
    getFlow(id: $id) {
      id
      name
      active
      steps {
        id
        type
        key
        appKey
        status
        position
        connection {
          id
          verified
          createdAt
        }
        parameters
      }
    }
  }
`;
